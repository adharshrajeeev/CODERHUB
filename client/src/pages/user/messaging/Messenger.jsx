import React,{useEffect} from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import { fetchUserDetails } from "../../../api/UserServices";
import LeftBar from '../../../components/user/leftbar/LeftBar'
import './MessengerStyle.scss'
import Chat from '../../../components/user/chats/Chat';



function Messenger() {

    useEffect(()=>{
        fetchUserDetails();
    },[])
    

  return (
    <div>
    <Navbar/>
    <div style={{ display: "flex" }}>
      <LeftBar/>
      <div style={{ flex: 8 }}>
    <div className="chatapp">
    
      <Chat/>
    </div>
      </div>
      {/* <RightBar /> */}
    </div>
  </div>
  )
}

export default Messenger      