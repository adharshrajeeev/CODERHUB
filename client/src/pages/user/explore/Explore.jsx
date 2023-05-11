import React,{useEffect} from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import RightBar from '../../../components/user/rightBar/RightBar';
import { fetchUserDetails } from "../../../api/UserServices";
import { useSelector } from 'react-redux';
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading';
import NewNavbar from '../../../components/user/navbar/NewNavbar';
const LazyExplore = React.lazy(()=>import('../../../components/user/explore/ExplorePosts'))

function Explore() {

  useEffect(()=>{
    fetchUserDetails();
  },[])

  const userId=useSelector((state)=>state?.user?.user?._id)
  return (
    <div>
     <NewNavbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 6 }}>
      <div className="home">
        <React.Suspense fallback={<SkeletonLoading/>}>
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