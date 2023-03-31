import React from 'react'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";


import './widgetStyle.scss'

function Widget({title,userCount}) {
 
  return (
    <div className="widget"> 
    <div className="left">
      <span className="title">{title}</span>
      <span className="counter">
        {userCount}
      </span>
      <span className="link">user details</span>
    </div>
  </div>
  )
}

export default Widget