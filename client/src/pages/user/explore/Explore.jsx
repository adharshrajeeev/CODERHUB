import React,{useEffect} from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import RightBar from '../../../components/user/rightBar/RightBar';
import { fetchUserDetails } from "../../../api/UserServices";
import { useSelector } from 'react-redux';
import CircularLoading from '../../../components/user/Loading/CircularLoading';
const LazyExplore = React.lazy(()=>import('../../../components/user/explore/ExplorePosts'))

function Explore() {

  useEffect(()=>{
    fetchUserDetails();
  },[])

  const userId=useSelector((state)=>state?.user?.user?._id)
  return (
    <div>
      <Navbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 6 }}>
      <div className="home">
        <React.Suspense fallback={<CircularLoading/>}>
        <LazyExplore/>
        </React.Suspense>
      </div>
        </div>
        <RightBar userId={userId}/>
      </div>
    </div>
  )
}

export default Explore