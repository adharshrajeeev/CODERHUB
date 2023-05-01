import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

function Chat() {
  return (
    <div className='messageChat'>
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <img src="https://w7.pngwing.com/pngs/141/210/png-transparent-three-dots-multimedia-solid-px-icon-thumbnail.png" alt="" />
        </div>
      </div>
        <Messages/>
        <MessageInput/>
    </div>
  )
}

export default Chat