import React from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import '../settings/settingsStyle.scss'
import PasswordReset from '../../../components/user/forgotPassword/PasswordReset'

function ForgotPassword() {
    return (
        <div>
          <Navbar/>
          <div style={{ display: "flex" }}>
            <LeftBar/>
            <div style={{ flex: 8 }}>
          <div className="settingsStyle">
            <PasswordReset/>
          </div>
            </div>
          </div>
        </div>
      )
}

export default ForgotPassword