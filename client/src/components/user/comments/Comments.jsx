import { useState } from 'react';
import axios from '../../../utils/axios'
import { ADD_COMMENTS } from '../../../utils/ConstUrls';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { setPost, updateExplorePosts, updateHomePosts } from '../../../redux/userSlice';
import {Toaster, toast} from 'react-hot-toast'
import './comments.scss'
import { useLocation } from "react-router-dom";
import CommentsOptions from './CommentsOptions';


const Comments = ({ postId, userId, comments }) => {



  const [postComments, setPostComments] = useState('')
  const dispatch = useDispatch();
  const location=useLocation()
  const handleSubmitComment = async () => {
    if(postComments.trim()===""){
      return toast.error("Please Fill Comment!!")
    }
    setPostComments("");


    try {
      const formData = new FormData();
      formData.append("postId", postId);
      formData.append("content", postComments);
      formData.append("userId", userId);
      const token = localStorage.getItem('token')
      const response = await axios.post(ADD_COMMENTS, formData, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } });
      if(location.pathname==='/home'){
        dispatch(updateHomePosts(response.data))
      }else if(location.pathname==='/explore'){
        dispatch(updateExplorePosts(response.data))
      }else{

        dispatch(setPost(response.data))
      }
    } catch (err) {
      console.log("comment added error", err)
    }
  }

  //Temporary       

  return (
    <div className="userComments">
      <div className="write">
        {/* <img src={currentUser.profilePic} alt="" /> */}
        <input type="text" placeholder="write a comment" value={postComments} onChange={(e) => setPostComments(e.target.value)} />
        <button onClick={handleSubmitComment}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.userPic} alt="" />
          <div className="commentsinfo">
            <span>{comment.userName}</span>
            <p>{comment.content}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
          <span className="commentOption">

           <CommentsOptions commentId={comment._id} postId={postId} userId={userId} commentedUserId={comment.userId}/>
            </span>
        </div>
      ))}
      <Toaster/>
    </div>
  );
};

export default Comments;
