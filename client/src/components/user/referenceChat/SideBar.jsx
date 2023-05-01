import React from 'react'
import SearchBar from './SearchBar'
import Chats from './Chats'

function SideBar() {

  const handleSelect=()=>{
    
  }

  return (
    <div className='messageSideBar'>
     <SearchBar/>
     <Chats/>
    </div>
  )
}

export default SideBar