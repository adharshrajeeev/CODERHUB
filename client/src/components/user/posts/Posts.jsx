import { useEffect, useState } from "react";
import Post from "../post/Post";
import axios from '../../../utils/axios'
import "./posts.scss";
import { ALL_POSTS } from "../../../utils/ConstUrls";
import decodeToken from '../../../utils/Services';


const Posts = () => {


  useEffect(()=>{
    getAllPosts();
  },[])
 
  const [posts,setPost]=useState([])
  const userId=decodeToken();

  const getAllPosts = async()=>{
    try{
      const token = localStorage.getItem('token');
      const {data}=await axios.get(`${ALL_POSTS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}` } });
      setPost(data)
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
