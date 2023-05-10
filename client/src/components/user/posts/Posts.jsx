import { useEffect } from "react";
import "./posts.scss";
import Post from "../post/Post";
import decodeToken from '../../../utils/Services';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePosts } from '../../../redux/userSlice';
import NoDataFound from "../noDataAvailable/NoDataFound";
import { fetchUserFriendsPosts } from "../../../api/UserServices";

const Posts = ({socket,user}) => {


  useEffect(()=>{
    getAllPosts();
  },[])
 
  const homePosts = useSelector((state) => state.user?.homePosts);
  const dispatch = useDispatch();
  const userId=decodeToken();

  const getAllPosts = async()=>{
    try{
      const response=await fetchUserFriendsPosts(userId)
      dispatch(setHomePosts(response?.data))
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
