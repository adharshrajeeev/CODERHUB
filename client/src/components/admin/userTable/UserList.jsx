import React, { useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import axios from '../../../utils/axios';
import './userTable.css'
import { GET_ALL_USERS } from '../../../utils/ConstUrls';


// function createData(No, Name, email, phoneNumber, gender,dateofbirth) {
//   return {No, Name, email, phoneNumber, gender,dateofbirth };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



function UserList() {

  const [usersList,setUsers]=useState([]);
  const adminToken=localStorage.getItem("adminToken");



  useEffect(()=>{
    getUserDetails();
  },[])

  const getUserDetails = async()=>{
    try{
      axios.get(GET_ALL_USERS,{ headers: { 'Authorization': `Bearer ${adminToken}` } }).then((response)=>{
        setUsers(response.data);  
        
      }).catch((err)=>{
        console.log(err,"catch error in userFetching")
      })
    }catch(err){
      console.log(err)
    } 
    
  }

  return (
    // 
    <table className='userTable'>
  <tr>
    <th>No</th>
    <th>Name</th>
    <th>Email</th>
    <th>Gender</th>
    <th>Dob</th>
    <th>Status</th>
    <th>Options</th>
  </tr>
  
    {
      usersList.map((user,index)=>
        <>
         <tr>
          <td>{index+1}</td>
          <td>{user.userName}</td>
          <td>{user.email}</td>
          <td>{user.gender}</td>
          <td>{user.dateOfBirth.slice(0,10)}</td>
          <td>{user.isBlocked ? "Blocked" :"Active"}</td>
          <td>
            <button>Block</button>
          </td>
          </tr>
          </>
      )
    }
 

</table>
  );
}

export default UserList