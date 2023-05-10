import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import decodeToken from '../../../utils/Services'
import NotificationStack from './NotificationStack';
import NoDataFound from '../noDataAvailable/NoDataFound';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../../redux/userSlice';


function Notifications() {
    
    
   
    const notifications=useSelector((state)=>state?.user?.notifications);
    const dispatch=useDispatch();
    const userId=decodeToken();
 
    const fetchAllNotifications= async()=>{
        try{
         const response=await  fetchAllNotifications(userId)
        dispatch(setNotification(response.data))
        }catch(Err){
            console.log(Err)
        }
    }  

    useEffect(()=>{
        fetchAllNotifications();
    },[userId])
    

  return (
    <>
  
    <Stack spacing={2} sx={{ maxWidth: '100%' }} p={2}>
        {
            notifications?.length===0 ? <NoDataFound data={'Notifications'}/> : 
            notifications?.map((n,index)=>(
                <NotificationStack key={index} notification={n} userId={userId} fetchAllNotifications={fetchAllNotifications}/>
            ))
        }
       
  </Stack>
  
 </>
  )
}

export default Notifications