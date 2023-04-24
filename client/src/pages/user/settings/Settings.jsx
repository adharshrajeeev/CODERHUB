import React, { useEffect } from 'react';
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import './settingsStyle.scss'
import { fetchUserDetails } from '../../../api/UserServices'
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading'
const LazySettings=React.lazy(()=>import('../../../components/user/settingsTab/UserSettings'))

function Settings() {
  useEffect(()=>{
    fetchUserDetails();
  },[])

  return (
    <div>
      <Navbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 8 }}>
      <div className="settingsStyle">
        <React.Suspense fallback={<SkeletonLoading/>}>
          <LazySettings/>
        </React.Suspense>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Settings