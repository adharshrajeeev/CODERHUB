import React from 'react'
import './ChatOnlineStyle.css'

function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8jWaFyn-N_dkEvBAVABV-2l9Q0_fGvBcQ1YbDQD_Q7w&s" className='chatOnlineImg' alt="" />
                <div className="chatOnlineBadge">

                </div>
            </div>
            <span className="chatOnlineName">John Doe</span>
        </div>
    </div>
  )
}

export default ChatOnline