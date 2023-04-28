import React, { useEffect } from 'react'
import Post from '../post/Post';
// import { useSelector,useDispatch } from "react-redux";
import axios from '../../../utils/axios'
import { EXPLORE_ALLPOST } from '../../../utils/ConstUrls'
import './ExploreStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePosts } from '../../../redux/userSlice';


function ExplorePosts() {

  


  
  const homePosts = useSelector((state) => state.user?.homePosts);
  const dispatch = useDispatch();
  const userId=useSelector((state)=>state.user?.user?._id)
  const exploreAllPosts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${EXPLORE_ALLPOST}/${userId}`, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } })

      dispatch(setHomePosts(response.data))
    } catch (err) {
      console.log("explore post error", err) 
    }
  }

  useEffect(() => {
    exploreAllPosts();
  }, [])


  return (
    <div className='explore'>
      {homePosts.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  )
}

export default ExplorePosts