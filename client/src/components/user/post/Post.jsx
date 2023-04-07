import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import {  useState } from "react";
import { useSelector } from "react-redux";
import axios from '../../../utils/axios'
import moment from 'moment'
import {  LIKE_POST, UNLIKE_POST } from "../../../utils/ConstUrls";
import toast,{Toaster} from 'react-hot-toast'
import PostMenuButton from "./PostMenuButton";



const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const userId=useSelector((state)=>state.user?.user?._id)
  let profilePic=useSelector((state)=>state.user?.user?.profilePic);
  const [likeCount,SetLikeCount]=useState(post.likes?.length)
  const [Like,setLiked]=useState(post.likes?.includes(userId) ? FavoriteOutlinedIcon :  FavoriteBorderOutlinedIcon);


  var imagefile
  if(post.postedUser?._id===userId){
    imagefile=true
  }

 

  const handleLike = async()=>{
      try{  
        const token = localStorage.getItem('token')
        const body=JSON.stringify({
          postId:post._id,
          userId:userId
        }
        )

        if(Like===FavoriteOutlinedIcon){
     axios.put(UNLIKE_POST,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", } }).then((response)=>{

       setLiked(FavoriteBorderOutlinedIcon);
       SetLikeCount(count=>count-1)
     }).catch((err)=>{
        toast.error("Oops Something went Wrong")
     })
       

          
        }else{

         await axios.put(LIKE_POST,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", } }).then((response)=>{

           setLiked(FavoriteOutlinedIcon);
           SetLikeCount(count=>count+1)
         }).catch((err)=>{
          toast.error("Oops Something Went Wrong ")  
         })
         
        }
      }catch(err){
        toast.error("Oops Something Went Wrong ")
      }
  }

  return (
    <div  className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
           { imagefile ?  <img src={profilePic} alt="" /> : <img src={post.postedUser?.profilePic} alt="" />}
            <div className="details">
              {
                userId === post.postedUser._id ?  <Link 
                to={`/profile`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.postedUser?.userName}</span>
              </Link>
              :
              <Link 
              to={`/user-profile/${post?.postedUser?._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="name">{post.postedUser?.userName}</span>
            </Link>
              }
             
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
         {/* <PostMenuButton post={post} postedUser={post.postedUser._id}/> */}
         <PostMenuButton postId={post._id} postedUserId={post.postedUser._id} userId={userId} content={post.content} postImage={post?.image?.url} />
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
            {post.comments.length}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>  
        </div>
        {commentOpen && <Comments postId={post._id} userId={userId} comments={post.comments}/>}
      </div>
      <Toaster/>
    </div>
  );
};

export default Post;
