import { useEffect, useState } from "react";
import Post from "../post/Post";
import axios from '../../../utils/axios'
import "./posts.scss";
import { ALL_POSTS } from "../../../utils/ConstUrls";
import { useSelector } from "react-redux";

const Posts = () => {
 
  const [posts,setPost]=useState([])
  const userId=useSelector((state)=>state.user.user?._id)

  const getAllPosts = async()=>{
    try{
      const token = document.cookie.slice(6);
      const {data}=await axios.get(`${ALL_POSTS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}` } });
      setPost(data)
    }catch(err){
        console.log("home user posts error",err)
    }
  }
  useEffect(()=>{
    getAllPosts();
  },[])

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
