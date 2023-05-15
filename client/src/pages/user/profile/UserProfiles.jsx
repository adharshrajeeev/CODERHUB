import React, { useEffect, useState } from 'react';
import './profileStyle.scss';
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Post from '../../../components/user/post/Post';
import toast,{Toaster} from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import noProfilePicture from '../../../assets/noProfilePicture.jpg'
import decodeToken from '../../../utils/Services';
import { Box, Button, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchOtherUserDetails, fetchUserDetails, followUser, unFollowUser } from '../../../api/UserServices';
import NewNavbar from '../../../components/user/navbar/NewNavbar';
import { useSelector } from 'react-redux';

function UserProfiles() {

    const params=useParams();
    const userData=useSelector((state)=>state?.user?.user);
    const [loading,setLoading]=useState(false)
    const [userDetails,setUserDetails]=useState("");
    const [isFollowing,setFollowing]=useState(false);
    const [posts,setPosts]=useState([]);
    const userId=decodeToken();

    const fetchUserDatas = async ()=>{
      try{
        const response= await fetchOtherUserDetails(params?.id,userId);
        setUserDetails(response?.data?.userData);
        setPosts(response?.data?.posts)
        if(userData.following?.includes(params?.id)){
          setFollowing(true)
        }
      }catch(err){
        setLoading(false)
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchUserDatas()
    },[])
    const handleFollowUser = async()=>{
        const userId=decodeToken();
        const followerId=params.id;
        const body={
          userId,
          followerId
        }
        setLoading(true)
          try{
            const response = await followUser(body)
               toast(response.data.message,
            {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
          setLoading(false)
          setFollowing(true)
            fetchUserDetails()
          }catch(err){
            setLoading(false)
            console.log(err,"follow error")
            toast.error(err.response.data.message)
          }
      }

      const handleUnfollow =  async ()=>{
        const userId=decodeToken();
        const followingId=params.id
        const body={
          userId,
          followingId
        }
        try{
          setLoading(true)
          setFollowing(false)
          const response = await unFollowUser(body)
             toast(response.data.message,
          {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        setLoading(false)
        fetchUserDetails();
        }catch(err){
          setLoading(false)
          console.log(err,"unfolowo eror")
          toast.error(err.response.data.message)
        }
    
      }

  
  return (
    <div>
      <NewNavbar/>
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 8 }}>
          <div className="home">
            <div className="profile">
              <div className="images">
                {
                  userDetails.coverPic ? <img
                    src={userDetails.coverPic}
                    alt="Coverpicture"
                    className="cover"
                  /> : <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwJHtrA3c6twCYZPlOkAsZG1QcjGW04SyPqA&usqp=CAU"
                    alt="Coverpicture"
                    className="cover"
                  />
                }
                {
                    userDetails.profilePic ?  <img
                    src={userDetails.profilePic}
                    alt=""
                    className="profilePic"    
                  />
                  : <img
                  src={noProfilePicture}
                  alt=""
                  className="profilePic"    
                />

                }
              </div>
              <div className="profileContainer">
                <div className="uInfo">
                  <div className="center">
                    <Box>
                      <Stack direction={"column"} alignItems={"center"}>
                    <span style={{ marginTop: "50px" }}>{userDetails.userName}</span>

                      </Stack>
                    </Box>
                    <Box>
                      {userDetails?.gender} / {userDetails?.userBio}
                    </Box> 
                    <Box >
                      <Stack direction={"row"} spacing={2}>
                        <Button variant="outlined" startIcon={<PeopleIcon />}>
                          {userDetails?.followers?.length} Followers
                        </Button>
                        {
                           isFollowing ? <LoadingButton style={{backgroundColor:"#ff5a5a"}} onClick={handleUnfollow} loading={loading} >Unfollow</LoadingButton> : <LoadingButton onClick={handleFollowUser} loading={loading}  >Follow</LoadingButton>
                        }
                        <Button variant="outlined" startIcon={<PeopleIcon />}>
                          {userDetails?.following?.length !== 0 ? userDetails?.following?.length : 0} Followings
                        </Button>
                      </Stack>
                    </Box>
                    {/* {
                        isFollowing ? <button onClick={handleUnfollow}>Remove Follower</button> : <button onClick={handleFollowUser} >Follow</button>
                    } */}
                  </div>
                </div>
                <div className='userPosts'>

                  {posts?.map(post => (
                     <Post post={post} key={post._id}/>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>  
      <Toaster/>
    </div>
  )
}

export default UserProfiles