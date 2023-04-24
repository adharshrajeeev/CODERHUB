import React,{useEffect} from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
// import Posts from "../../../components/user/posts/Posts"
import RightBar from '../../../components/user/rightBar/RightBar';
import { fetchUserDetails } from "../../../api/UserServices";
import "./home.scss"
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading';
const LazyPosts = React.lazy(()=>import('../../../components/user/posts/Posts'))
function Home() {

  useEffect(()=>{
    fetchUserDetails();
  },[])


 
  return (
    <div>
      <Navbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 6 }}>
      <div className="home">
      <React.Suspense fallback={<SkeletonLoading/>}>
      <LazyPosts/>
        </React.Suspense>  
  
      </div>
        </div>
        <RightBar />
      </div>
    </div>
  )
}

export default Home