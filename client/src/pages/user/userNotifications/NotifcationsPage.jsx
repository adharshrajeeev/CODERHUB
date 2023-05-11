import React,{useEffect} from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import { fetchUserDetails } from "../../../api/UserServices";
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading';
import Notifications from '../../../components/user/notification/Notifications';
import NewNavbar from '../../../components/user/navbar/NewNavbar';

function NotifcationsPage() {

    useEffect(()=>{
        fetchUserDetails();
      },[])
  return (
    <div>
      <NewNavbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 8 }}>
      <div className="notifications">
      <Notifications/>
  
      </div>
        </div>
      </div>
    </div>
  )
}

export default NotifcationsPage