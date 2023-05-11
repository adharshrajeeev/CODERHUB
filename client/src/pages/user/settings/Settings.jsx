import React, { useEffect } from 'react';
import LeftBar from '../../../components/user/leftbar/LeftBar'
import './settingsStyle.scss'
import { fetchUserDetails } from '../../../api/UserServices'
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading'
import NewNavbar from '../../../components/user/navbar/NewNavbar';
const LazySettings=React.lazy(()=>import('../../../components/user/settingsTab/UserSettings'))

function Settings() {
  useEffect(()=>{
    fetchUserDetails();
  },[])

  return (
    <div>
      <NewNavbar/>
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