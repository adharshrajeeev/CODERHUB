import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast'
import BlockPostModal from '../modals/BlockPostModal';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {useNavigate} from 'react-router-dom'
import { changePostStatus, fetchAllPostReportedWise } from '../../../api/AdminServices';



function PostList() {

  const [postsLists, setPostLists] = useState([]);
  const navigate=useNavigate()



  const getAllPostsList = async () => {
    try {
      const response=await fetchAllPostReportedWise();
      setPostLists(response.data);    
    } catch (err) {
      toast.error("Oops Somethign went wrong")

    }
  }

  const handleBlockAndUnBlock = async(postId,status)=>{
    try{

      if(status){
        const response=await changePostStatus(postId,'unBlock')
        toast.success(response.data.message);
        getAllPostsList();
      }else{
        const response=await changePostStatus(postId,'block')
        toast.success(response.data.message);
        getAllPostsList();
      }
    }catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    getAllPostsList();
  }, [])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nos</TableCell>
              <TableCell align="right">Posted User</TableCell>
              <TableCell align="right">Total Reports</TableCell>
              <TableCell align="right">Option</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postsLists.map((post, index) => (
              <TableRow
                key={post._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{post.postedUser.userName}</TableCell>
                <TableCell align="right">{post.numReports}</TableCell>
                {/* <TableCell align="right">{post.reportsContent}</TableCell> */}
                <TableCell align="right">
                  <BlockPostModal isBlocked={post.isBlocked} handleBlockAndUnBlock={handleBlockAndUnBlock} postId={post._id} data={"Post"}/>
                </TableCell>
                <TableCell style={{ textAlign: "center" }} onClick={()=>navigate(`/admin/posts/detailed/${post._id}`)} ><ArrowCircleRightIcon/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Toaster />
    </div>
  )
}

export default PostList