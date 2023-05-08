import { useEffect } from "react";
import Post from "../post/Post";
import axios from '../../../utils/axios'
import "./posts.scss";
import { ALL_POSTS } from "../../../utils/ConstUrls";
import decodeToken from '../../../utils/Services';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePosts, setPosts } from '../../../redux/userSlice';
import NoDataFound from "../noDataAvailable/NoDataFound";

const Posts = ({socket,user}) => {


  useEffect(()=>{
    getAllPosts();
  },[])
 
  const homePosts = useSelector((state) => state.user?.homePosts);
  const dispatch = useDispatch();
  const userId=decodeToken();

  const getAllPosts = async()=>{
    try{
      const token = localStorage.getItem('token');
      const {data}=await axios.get(`${ALL_POSTS}/${userId}`,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } });
      dispatch(setHomePosts(data))
    }catch(err){
        console.log("home user posts error",err)
    }
  }


  return <div className="posts">
    {
      homePosts?.length===0 && <NoDataFound data={'Posts'}/>
    }
    {homePosts?.map((post,index)=>(
      <Post post={post} key={index} socket={socket} user={user}/>
    ))}
  </div>;
};

export default Posts;
