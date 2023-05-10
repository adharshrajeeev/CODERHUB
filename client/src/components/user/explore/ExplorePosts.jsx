import React, { useEffect, useState } from 'react'
import './ExploreStyle.scss';
import Post from '../post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { setExplorePosts } from '../../../redux/userSlice';
import { fetchExplorePosts } from '../../../api/UserServices';


function ExplorePosts() {

  


  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const userId=useSelector((state)=>state.user?.user?._id)
  const allPosts = useSelector((state) => state.user?.explorePosts);
 
  const exploreAllPosts = async () => {
    try {
      const response = await fetchExplorePosts(userId,page)
      dispatch(setExplorePosts(response.data));
      setLoading(false)
    } catch (err) {
      console.log("explore post error", err) 
    }
  }

  useEffect(() => {
    exploreAllPosts(); 
  }, [page])

  const handleScroll = ()=>{
    const { scrollTop, clientHeight, scrollHeight } =
    document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
          setLoading(true)
          setPage((prev) => prev + 1);
      }
        }

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll)

    return ()=>window.removeEventListener("scroll",handleScroll)

  },[])
 

  return (
    <div className='explore'>
      {allPosts?.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  )
}

export default ExplorePosts