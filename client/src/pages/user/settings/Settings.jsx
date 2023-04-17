import React from 'react';
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import './settingsStyle.scss'
import UserSettings from '../../../components/user/settingsTab/UserSettings';

function Settings() {
  return (
    <div>
      <Navbar/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 8 }}>
      <div className="settingsStyle">
        <UserSettings/>
  
      </div>
        </div>
      </div>
    </div>
  )
}

export default Settings