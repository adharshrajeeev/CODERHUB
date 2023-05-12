import { useState } from "react";
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useSelector } from "react-redux";
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'
import PostMenuButton from "./PostMenuButton";
import { RWebShare } from "react-web-share";
import CircularLoading from "../Loading/CircularLoading";
import { toggleLikePost, toggleUnLikePost } from "../../../api/UserServices";



const Post = ({ post, loading,socket,user }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const userId = useSelector((state) => state.user?.user?._id)
  let profilePic = useSelector((state) => state.user?.user?.profilePic);
  const userName=useSelector((state)=>state?.user?.user?.userName)
  const [likeCount, SetLikeCount] = useState(post.likes?.length)
  const [Like, setLiked] = useState(post.likes?.includes(userId) ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon);


  var imagefile
  if (post.postedUser?._id === userId) {
    imagefile = true
  }



  const handleLike = async () => {
    try {
      const body = {
        postId: post._id,
        userId: userId
      }
      

      if (Like === FavoriteOutlinedIcon) {
        setLiked(FavoriteBorderOutlinedIcon);
        SetLikeCount(count => count - 1)
        await toggleUnLikePost(body)
      
      } else {
        setLiked(FavoriteOutlinedIcon);
        SetLikeCount(count => count + 1)
        await toggleLikePost(body)
        socket?.emit("sendNotification",{
          senderName:userName,
          receiverName:post?.postedUser?.userName,
          type:"LIKE"
        })
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className="post">
      {
        loading ? <CircularLoading /> :

          <div className="container">
            <div className="user">
              <div className="userInfo">
                {imagefile ? <img src={profilePic} alt="" /> : <img src={post.postedUser?.profilePic} alt="" />}
                <div className="details">
                  {
                    userId === post.postedUser._id ? <Link
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
              { post.videoUrl && 
                <video controls width="100%" >
                  <source  src={post.videoUrl} type="video/mp4" />
                </video>
              }
              {
                post?.image && 
              <img src={post?.image?.url} alt="" />
              }
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
                <RWebShare data={{
                  text: `User Post`,
                  url: `http://localhost:3000/user-profile/${post?.postedUser?._id}`,
                  title: `${post.postedUser?.userName}s Post`,
                }}
                  onClick={() => console.log("shared successfully!")}>
                  <ShareOutlinedIcon />
                </RWebShare>
                Share
              </div>
            </div>
            {commentOpen && <Comments postId={post._id} userId={userId} comments={post.comments} />}
          </div>
      }
      <Toaster />
    </div>
  );
};

export default Post;
