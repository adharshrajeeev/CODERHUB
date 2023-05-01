import React, { useEffect } from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import { fetchUserDetails } from "../../../api/UserServices";
import LeftBar from '../../../components/user/leftbar/LeftBar'
import SideBar from '../../../components/user/referenceChat/SideBar';
import Chat from '../../../components/user/referenceChat/Chat';
import './MessageStyle.scss'

function MessagePage() {
    useEffect(() => {
        fetchUserDetails();
    }, [])
    return (
        <div>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 8 }}>
                    <div className="chatHome">
                        <div className="container">
                            <SideBar/>
                            <Chat/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagePage