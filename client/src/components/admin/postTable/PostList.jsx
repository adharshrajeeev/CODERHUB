import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from '../../../utils/axios';
import { CHANGE_POST_STATUS, GET_REPORTED_POSTS } from '../../../utils/ConstUrls';
import toast, { Toaster } from 'react-hot-toast'
import { adminConfig } from '../../../utils/Services';
import BlockPostModal from '../modals/BlockPostModal';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'postedUserName', headerName: 'Posted User', width: 90 },
  { field: 'imageUrl', headerName: 'Image URL', width: 130 },
  { field: 'content', headerName: 'Content', width: 300 },
  { field: 'likes', headerName: 'Likes', width: 90 },
  { field: 'comments', headerName: 'Comments', width: 90 },
  { field: 'reports', headerName: 'Reports', width: 90 },
  
];
function PostList() {

  const [postsLists, setPostLists] = useState([]);

  const adminToken = localStorage.getItem("adminToken");

  const getAllPostsList = async () => {
    try {
      axios.get(GET_REPORTED_POSTS,{ headers: { "Authorization":`Bearer ${adminToken}` } }).then((response) => {
        setPostLists(response.data);
      //  response.data?.map((item,index)=>({
      //     id: index + 1,
      //     postedUserName:item.postedUser.userName,
      //     imageUrl: item.image.url,
      //     content: item.content,
      //     likes: [item.likes].length,
      //     comments: item.comments.length,
      //     reports: item.reports.length,
      //   }))
        
      }).catch((err) => {
        toast.error("Oops Somethign went wrong")
      })
    } catch (err) {
      toast.error("Oops Somethign went wrong")

    }
  }

  const handleBlockAndUnBlock = async(postId,status)=>{
    if(status){
      axios.put(`${CHANGE_POST_STATUS}?postId=${postId}&postStatus=unBlock`,status,adminConfig).then((response)=>{
        toast.success(response.data.message);
        getAllPostsList();
      }).catch((err)=>{
        toast.error("Oops Something went wrong")
      })
    }else{
      axios.put(`${CHANGE_POST_STATUS}?postId=${postId}&postStatus=block`,status,adminConfig).then((response)=>{
        toast.success(response.data.message);
        getAllPostsList();
      }).catch((err)=>{
        toast.error("Oops Something went wrong")
      })
    }
  }
  const getRowId = (row) => row._id;

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
              <TableCell align="right">postId</TableCell>
              <TableCell align="right">Posted User</TableCell>
              <TableCell align="right">Total Reports</TableCell>
              <TableCell align="right">Option</TableCell>
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
                <TableCell align="right">{post._id}</TableCell>
                <TableCell align="right">{post.postedUser.userName}</TableCell>
                <TableCell align="right">{post.reports.length}</TableCell>
                <TableCell align="right">
                  {/* <Button variant="contained" size="small" onClick={()=>handleBlockAndUnBlock(post._id,post.isBlocked)}>
                    {post.isBlocked ? "UnBlock" : "Block"}
                  </Button> */}
                  <BlockPostModal isBlocked={post.isBlocked} handleBlockAndUnBlock={handleBlockAndUnBlock} postId={post._id} data={"Post"}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Toaster />
    </div>
  //   <div style={{ height: 600, width: '100%' }}>
  //   <DataGrid
  //     rows={postsLists}
  //     columns={columns}
  //     getRowId={getRowId}
  //     paginationModel={{ page: 0, pageSize: 10 }}
  //     checkboxSelection
  //   />
  // </div>
  
  )
}

export default PostList