import React from 'react'



import './widgetStyle.scss'

function Widget({title,count}) {
 
  return (
    <div className="widget"> 
    <div className="left">
      <span className="title">{title}</span>
      <span className="counter">
        {count}
      </span>
      <span className="link">{title} details</span>
    </div>
  </div>
  )
}

export default Widget