import React,{useEffect, useState} from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import { fetchUserDetails } from "../../../api/UserServices";
import { useLocation } from 'react-router-dom';
import SearchData from '../../../components/user/searchedList/SearchData';

function SearchedResults() {

    const location=useLocation();
    const userData=location?.state?.data;
    const [users,setUsers]=useState([])


    useEffect(()=>{
        fetchUserDetails();
      },[])

      useEffect(()=>{
        setUsers(userData)
      },[])

      console.log(userData,"add")

  return (
    <div>
    <Navbar/>
    <div style={{ display: "flex" }}>
      <LeftBar/>
      <div style={{ flex: 8 }}>
    <div className="home">
  
    <SearchData users={users}/>
    </div>
      </div>
    
    </div>
  </div>
  )
}

export default SearchedResults