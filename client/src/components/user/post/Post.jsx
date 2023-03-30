import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from '../../../utils/axios'
import moment from 'moment'
import { LIKE_POST } from "../../../utils/ConstUrls";


const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [likes,setLikes]=useState(post.likes?.length)
  const userId=useSelector((state)=>state.user?.user?._id)
  const {profilePic}=useSelector((state)=>state.user?.user)
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
        setLikes((cur)=>cur+1)
        const response=await axios.put(LIKE_POST,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", } });
        console.log(response,"like response")
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
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.content}</p>
          <img src={post?.image?.url} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {post.likes?.includes(userId) ? <FavoriteOutlinedIcon  style={{color:"red"}}  /> : <FavoriteBorderOutlinedIcon onClick={handleLike} />}
            {likes} Likes
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
