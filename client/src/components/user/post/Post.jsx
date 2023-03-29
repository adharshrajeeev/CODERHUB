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

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const postedDate=post.createdAt;
  const currentDate=new Date(postedDate);
  const postDate=currentDate.getDate() +  " " + currentDate.toLocaleString('default', { month: 'long' }) + " " + currentDate.getFullYear()
  const userId=useSelector((state)=>state.user?.user?._id)
  const liked = false;
  const {profilePic}=useSelector((state)=>state.user?.user)
  var imagefile
  if(post.postedUser?._id===userId){
     imagefile=true
  }

  return (
    <div className="post">
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
              <span className="date">{postDate}</span>
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
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
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
