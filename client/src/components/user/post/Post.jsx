import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from '../../../utils/axios'
import moment from 'moment'
import {  LIKE_POST, UNLIKE_POST } from "../../../utils/ConstUrls";
import PostMenuButton from "./PostMenuButton";



const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const userId=useSelector((state)=>state.user?.user?._id)
  const {profilePic}=useSelector((state)=>state.user?.user);
  const [likeCount,SetLikeCount]=useState(post.likes?.length)
  const [Like,setLiked]=useState(post.likes?.includes(userId) ? FavoriteOutlinedIcon :  FavoriteBorderOutlinedIcon);

  var imagefile
  if(post.postedUser?._id===userId){
    imagefile=true
  }

 

  const handleLike = async()=>{
      try{  
        const token = document.cookie.slice(6);
        const body=JSON.stringify({
          postId:post._id,
          userId:userId
        }
        )

        if(Like==FavoriteOutlinedIcon){
          const  response=await axios.put(UNLIKE_POST,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", } });
          setLiked(FavoriteBorderOutlinedIcon);
          SetLikeCount(count=>count-1)
          console.log(response,"unlike response")

          
        }else{

          const response=await axios.put(LIKE_POST,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", } });
          setLiked(FavoriteOutlinedIcon);
          SetLikeCount(count=>count+1)
          console.log(response,"like response")

        }
      }catch(err){
        console.log("Like function error",err)
      }
  }

  return (
    <div  className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
           { imagefile ?  <img src={profilePic} alt="" /> : <img src={post.postedUser?.profilePic} alt="" />}
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.postedUser?.userName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
         {/* <PostMenuButton post={post} postedUser={post.postedUser._id}/> */}
         <PostMenuButton postId={post._id} postedUserId={post.postedUser._id} userId={userId} />
        </div>
        <div className="content">
          <p>{post.content}</p>
          <img src={post?.image?.url} alt="" />
        </div>
        <div className="info">
          <div className="item" >
            {<Like onClick={handleLike} />}
            {likeCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>  
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
