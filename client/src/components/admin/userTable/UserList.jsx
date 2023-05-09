import React, { useEffect, useState } from 'react';
import './userTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast'
import BlockPostModal from '../modals/BlockPostModal';
import { changeUserStatus, fetchAllUsers } from '../../../api/AdminServices';






function UserList() {

  const [usersList, setUsers] = useState([]);
  

  useEffect(() => {
    getUserDetails();
  }, [])


  const getUserDetails = async () => {
    try {
      const response=await fetchAllUsers();
      setUsers(response);
    } catch (err) {
      console.log(err)
    }

  }



  const handleBlocknUnBlock = async (userId, status) => {
    if (status) {
      const response=await changeUserStatus(userId,'unBlock');
      toast.success(response.data.message);
      getUserDetails();
    } else {
      const response=await changeUserStatus(userId,'block');
      toast.success(response.data.message);
      getUserDetails();
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

              <TableCell align="right">
                  <BlockPostModal isBlocked={user.isBlocked} handleBlockAndUnBlock={handleBlocknUnBlock} postId={user._id} data={"User"}/>
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