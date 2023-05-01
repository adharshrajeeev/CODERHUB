import React from 'react'

function MessageInput() {
  return (
    <div className='messageInput'>
        <input type="text" placeholder='Type Something' />
        <div className="send">
            <button>Send</button>
        </div>
    </div>
  )
}

export default MessageInput