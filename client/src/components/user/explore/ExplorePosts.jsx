import React, { useEffect, useState }  from 'react'
import Post from '../post/Post';
import { useSelector,useDispatch } from "react-redux";
import axios from '../../../utils/axios'
import {EXPLORE_ALLPOST} from '../../../utils/ConstUrls'
import './ExploreStyle.scss';

function ExplorePosts() {


  const [posts,setPosts]=useState([])

  const exploreAllPosts = async()=>{
    try{
      const token = document.cookie.slice(6)
      const {data}=await axios.get(EXPLORE_ALLPOST,{ headers: { 'Authorization': `Bearer ${token}` } })
      setPosts(data)
    }catch(err){
      console.log("explore post error",err)
    }
  }

  useEffect(()=>{
    exploreAllPosts();
  },[])

  return (
    <div className='explore'>
        {posts.map(post=>(
      <Post post={post} key={post._id}/>
    ))}
    </div>
  )
}

export default ExplorePosts