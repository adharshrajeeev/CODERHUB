import { useState } from 'react';
import axios from '../../../utils/axios'
import { ADD_COMMENTS } from '../../../utils/ConstUrls';
import moment from 'moment';
import {useDispatch} from 'react-redux'
import { setPost } from '../../../redux/userSlice';
import './comments.scss'


const Comments = ({postId,userId,comments}) => {



    const [postComments,setPostComments]=useState('')
    const dispatch = useDispatch();
    const handleSubmitComment = async()=>{
      setPostComments("");


      try{
        const formData=new FormData();
        formData.append("postId",postId);
        formData.append("content",postComments);
        formData.append("userId",userId);
        const token=document.cookie.slice(6);
       const response=await axios.post(ADD_COMMENTS,formData,{ headers: {'Authorization':`Bearer ${token}`,"Content-Type": "application/json" } });

       dispatch(setPost(response.data))
      }catch(err){
        console.log("comment added error",err)
      }
    }

  //Temporary       
  
  return (
    <div className="userComments">
      <div className="write">
        {/* <img src={currentUser.profilePic} alt="" /> */}
        <input type="text" placeholder="write a comment" value={postComments} onChange={(e)=>setPostComments(e.target.value)}/>
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
        </div>
      ))}
    </div>
  );
};

export default Comments;
