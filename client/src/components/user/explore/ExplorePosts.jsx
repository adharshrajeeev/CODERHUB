import React, { useEffect } from 'react'
import Post from '../post/Post';
// import { useSelector,useDispatch } from "react-redux";
import axios from '../../../utils/axios'
import { EXPLORE_ALLPOST } from '../../../utils/ConstUrls'
import './ExploreStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../../redux/userSlice';

function ExplorePosts() {

  


  
  const posts = useSelector((state) => state.user?.posts);
  const dispatch = useDispatch();
  const exploreAllPosts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(EXPLORE_ALLPOST, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } })

      dispatch(setPosts(response.data))
    } catch (err) {
      console.log("explore post error", err)
    }
  }

  useEffect(() => {
    exploreAllPosts();
  }, [])


  return (
    <div className='explore'>
      {posts.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  )
}

export default ExplorePosts