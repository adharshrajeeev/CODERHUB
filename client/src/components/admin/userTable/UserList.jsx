import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../../utils/axios';
import Button from '@mui/material/Button';
import toast,{Toaster} from 'react-hot-toast'
import './userTable.css'
import { CHANGE_USER_STATUS, GET_ALL_USERS } from '../../../utils/ConstUrls';
import { adminConfig } from '../../../utils/Services';







function UserList() {

  const [usersList,setUsers]=useState([]);

  useEffect(()=>{
    getUserDetails();
  },[])

  const getUserDetails = async()=>{
    try{
      axios.get(GET_ALL_USERS,adminConfig).then((response)=>{
        setUsers(response.data);  
        
      }).catch((err)=>{
        console.log(err,"catch error in userFetching")
      })
    }catch(err){
      console.log(err)
    } 
    
  }

  

  const handleBlocknUnBlock = async(userId,status)=>{
      if(status){
        axios.put(`${CHANGE_USER_STATUS}?userId=${userId}&userStatus=unBlock`,status,adminConfig).then((response)=>{
          toast.success(response.data.message);
          getUserDetails();
        }).catch((err)=>{
          toast.error("Oops Something went wrong")
        })
      }else{
        axios.put(`${CHANGE_USER_STATUS}?userId=${userId}&userStatus=block`,status,adminConfig).then((response)=>{
          toast.success(response.data.message);
          getUserDetails();
        }).catch((err)=>{
          toast.error("Oops Something went wrong")
        })

      }
  }         


    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nos</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Gender</TableCell>
              {/* <TableCell align="right">Status</TableCell> */}
              <TableCell align="right">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user,index) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{user.userName}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.dateOfBirth}</TableCell>
                <TableCell align="right">{user.gender}</TableCell>
                {/* <TableCell align="right">{user.gender}</TableCell> */}
               
                <TableCell align="right">
                  <Button variant="outlined" size="small"  onClick={()=>handleBlocknUnBlock(user._id,user.isBlocked)}>
                  {user.isBlocked ? "UnBlock" : "Block"}
                 </Button> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Toaster/>
      </TableContainer>
    );
}

export default UserList