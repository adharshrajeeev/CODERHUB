import React from 'react'
import './ErrorPageStyle.css'
import errorPage from '../../../assets/errorPage.jpg'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function ErrorPage500() {

    const navigate=useNavigate()

  return (
    <div
    style={{
      backgroundImage:`url(${errorPage})`,
      backgroundSize: 'cover',        
      backgroundPosition: 'center',    
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',  
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Button variant='contained' onClick={()=>navigate(-1)}>Go Back Home</Button>
  </div>
  )
}

export default ErrorPage500