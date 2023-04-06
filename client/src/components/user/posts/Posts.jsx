import { useEffect } from "react";
import Post from "../post/Post";
import axios from '../../../utils/axios'
import "./posts.scss";
import { ALL_POSTS } from "../../../utils/ConstUrls";
import decodeToken from '../../../utils/Services';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../../redux/userSlice';

const Posts = () => {


  useEffect(()=>{
    getAllPosts();
  },[])
 
  const posts = useSelector((state) => state.user?.posts);
  const dispatch = useDispatch();
  const userId=decodeToken();

  const getAllPosts = async()=>{
    try{
      const token = localStorage.getItem('token');
      const {data}=await axios.get(`${ALL_POSTS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } });
      dispatch(setPosts(data))
    }catch(err){
        console.log("home user posts error",err)
    }
  }


  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
