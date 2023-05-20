import React, {  useEffect, useState } from 'react';
import './userTable.css'
import toast, { Toaster } from 'react-hot-toast'
import BlockPostModal from '../modals/BlockPostModal';
import { changeUserStatus, fetchAllUsersPageNation } from '../../../api/AdminServices';
import moment from 'moment'

const LIMIT = 10;

const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for(let x = 1; x<= parseInt(total)/limit; x++){
    pages.push(x);
  }

  return pages;
}


function UserList() {

const [users, setUsers] = useState([]);
const [activePage, setActivePage] = useState(1);
const [totalUsers, setTotalUsers] = useState(0);

const handleBlocknUnBlock = async (userId, status) => {
  if (status) {
    const response=await changeUserStatus(userId,'unBlock');
    toast.success(response.data.message);
   
  } else {
    const response=await changeUserStatus(userId,'block');
    toast.success(response.data.message);
    
  }
  getAllPosts()
  
}
useEffect(()=>{
  try{
    getAllPosts()
  }catch(err){
    console.log(err)
  }

},[activePage]) 

const getAllPosts = async()=>{
  try{
    const {data} = await fetchAllUsersPageNation(activePage,LIMIT)
    setUsers(data?.records);
    setTotalUsers(data?.total); 
  }catch(err){
    console.log(err)
  }
}


return (
  <>
   <div className="app">
      <nav aria-label="Page navigation example">
        <div className="pagination">
  {activePage !== 1 && (
    <button className="page-link" onClick={() => setActivePage(activePage - 1)}>
      Previous
    </button>
  )}

  {totalPagesCalculator(totalUsers, LIMIT).map((page) => (
    <button
      className={`page-link ${activePage === page ? 'active' : ''}`}
      key={page}
      onClick={() => setActivePage(page)}
    >
      {page}
    </button>
  ))}

  {activePage !== totalPagesCalculator(totalUsers, LIMIT).length && (
    <button style={{backgroundColor:"#2741ff",color:"white",borderRadius:"4px",border:"none"}} className="page-link" onClick={() => setActivePage(activePage + 1)}>
      Next
    </button>
  )}
</div>
      </nav>
      <table className="table table-bordered" style={{width:'100%'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
         {users?.map(user => (
            <tr key={user._id}>
              <td>{user.userName}</td>
              <td>{moment().diff(moment(user?.dateOfBirth), 'years')}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>
              <BlockPostModal isBlocked={user.isBlocked} handleBlockAndUnBlock={handleBlocknUnBlock} postId={user._id} data={"User"}/>
              </td>
            </tr>
         ))}
          {users?.length === 0 && (
        <tr>
          <td colSpan="5" style={{ textAlign: 'center' }}>
            No data available
          </td>
        </tr>
      )}
        </tbody>
      </table>
      <Toaster/>
    </div>
  
  </>
)

}

export default UserList