import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from '../../../utils/axios'
import toast,{Toaster} from 'react-hot-toast'
import { SEARCH_ALL_USERS } from '../../../utils/ConstUrls';
import { useNavigate } from 'react-router-dom';

function Searches() {

    const [userSearchName,setSearchUserName]=useState("");
    const [searchError,setSearchErr]=useState(true) 
    const token=localStorage.getItem('token');
    const navigate=useNavigate()

    const handleSearchChange = (e)=>{
        if(e.target.value.trim()===""){
            setSearchErr(true)
        }else{
            setSearchErr(false)
        }
        
        setSearchUserName(e.target.value)
    }


    const handleSearchSubmit = async()=>{
        if(searchError){
            toast.error("Please fill the search",{
                position:"top-right"
              })
        }else{

            axios.get(`${SEARCH_ALL_USERS}?userSearchName=${userSearchName}`,{ headers: {'Authorization':`Bearer ${token}`,"Content-Type":"application/json" } }).then((response)=>{
               
                navigate('/searchResults',{state:{data:response.data}})
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

  return (
   <>
     <TextField value={userSearchName} onChange={handleSearchChange}  placeholder='Search Users' id="fullWidth" />
     <SearchOutlinedIcon onClick={handleSearchSubmit}/>
     <Toaster />
   </>
  )
}

export default Searches