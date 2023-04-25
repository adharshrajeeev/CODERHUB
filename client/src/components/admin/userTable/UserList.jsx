import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../../utils/axios';


import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch'
import toast, { Toaster } from 'react-hot-toast'
import './userTable.css'
import { CHANGE_USER_STATUS, GET_ALL_USERS } from '../../../utils/ConstUrls';
import BlockPostModal from '../modals/BlockPostModal';


const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));
const label = { inputProps: { 'aria-label': 'Color switch demo' } };



function UserList() {

  const [usersList, setUsers] = useState([]);
  

  useEffect(() => {
    getUserDetails();
  }, [])

  const adminToken = localStorage.getItem("adminToken");
  const getUserDetails = async () => {
    try {
      axios.get(GET_ALL_USERS, { headers: { "Authorization": `Bearer ${adminToken}` } }).then((response) => {
        setUsers(response.data);

      }).catch((err) => {
        console.log(err, "catch error in userFetching")
      })
    } catch (err) {
      console.log(err)
    }

  }



  const handleBlocknUnBlock = async (userId, status) => {
    // handleClickOpen()
    if (status) {
      axios.put(`${CHANGE_USER_STATUS}?userId=${userId}&userStatus=unBlock`, status, { headers: { "Authorization": `Bearer ${adminToken}` } }).then((response) => {
        toast.success(response.data.message);
        getUserDetails();
      }).catch((err) => {
        toast.error("Oops Something went wrong")
      })
    } else {
      axios.put(`${CHANGE_USER_STATUS}?userId=${userId}&userStatus=block`, status, { headers: { "Authorization": `Bearer ${adminToken}` } }).then((response) => {
        toast.success(response.data.message);
        getUserDetails();
      }).catch((err) => {
        toast.error("Oops Something went wrong")
      })

    }
  }


  return (
    <>      <TableContainer component={Paper}>
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
          {usersList?.map((user, index) => (
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
                {/* <Button variant="outlined" size="small"  onClick={()=>handleBlocknUnBlock(user._id,user.isBlocked)}> */}

                {/* <PinkSwitch checked={user.isBlocked} onChange={() => handleBlocknUnBlock(user._id, user.isBlocked)} label="End"
                  labelPlacement="end" /> */}
                  <BlockPostModal isBlocked={user.isBlocked} handleBlockAndUnBlock={handleBlocknUnBlock} postId={user._id} data={"User"}/>
                {/* </Button>  */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toaster />
    </TableContainer>

    </>

  );
}

export default UserList