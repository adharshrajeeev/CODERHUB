import React, { useEffect, useState }  from 'react'
import Post from '../post/Post';
// import { useSelector,useDispatch } from "react-redux";
import axios from '../../../utils/axios'
import {EXPLORE_ALLPOST} from '../../../utils/ConstUrls'
import './ExploreStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../../redux/userSlice';

function ExplorePosts() {

  useEffect(()=>{
    exploreAllPosts();
  },[])


  // const [posts,setPosts]=useState([]);
  const posts=useSelector((state)=>state.user.posts);

  const dispatch = useDispatch();
  const exploreAllPosts = async()=>{
    try{
      const token = document.cookie.slice(6)
      const {data}=await axios.get(EXPLORE_ALLPOST,{ headers: { 'Authorization': `Bearer ${token}` } })

      dispatch(setPosts(data))
    }catch(err){
      console.log("explore post error",err)
    }
  }

 
  return (
    <div className='explore'>
        {posts.map(post=>(
      <Post post={post} key={post._id}/>
    ))}
    </div>
  )
}

export default ExplorePosts