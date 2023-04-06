import React, { useEffect, useState } from 'react';
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import RightBar from '../../../components/user/rightBar/RightBar';
import Post from '../../../components/user/post/Post';
import './profileStyle.scss';
import axios from '../../../utils/axios'
import toast,{Toaster} from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import { FOLLOW_USER, GET_PROFILE_DETAILS, UNFOLLOW_USER } from '../../../utils/ConstUrls';
import noProfilePicture from '../../../assets/noProfilePicture.jpg'
import decodeToken from '../../../utils/Services';

function UserProfiles() {

    const params=useParams();
    const [userDetails,setUserDetails]=useState("");
    const [isFollowing,setFollowing]=useState(false);
    const [posts,setPosts]=useState([]);
    const getUserProfileDetails = async ()=>{
        const userId=decodeToken();
        const token = localStorage.getItem('token');
        axios.get(`${GET_PROFILE_DETAILS}?personId=${params.id}&userId=${userId}`,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json",  } }).then((response)=>{
            setUserDetails(response.data.userData);
            setPosts(response.data.posts)
            setFollowing(response.data.isFollowing)
        }).catch((err)=>{
            toast.error("Oops Something went wrong") 
        })
    }

    const handleFollowUser = async()=>{
        const userId=decodeToken();
        const followerId=params.id;
        const body=JSON.stringify({
          userId,
          followerId
        })
        const token=localStorage.getItem('token')
        axios.post(FOLLOW_USER,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }}).then((response)=>{
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
          getUserProfileDetails();
        }).catch((err)=>{
          toast.error("oops something went wrong")
        })
      }

      const handleUnfollow =  async ()=>{
        const userId=decodeToken();
        const followingId=params.id
        const body=JSON.stringify({
          userId,
          followingId
        })
        const token=localStorage.getItem('token');
    
        axios.post(UNFOLLOW_USER,body,{ headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "application/json", }}).then((response)=>{
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
          getUserProfileDetails();
        }).catch((err)=>{
          toast.error("OOPS Something went wrong");
          console.log(err)
        })
    
      }

    useEffect(()=>{
        getUserProfileDetails();
    },[])

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <div className="home">
            <div className="profile">
              <div className="images">
                {/* {
                  coverPic ? <img
                    src={coverPic}
                    alt="Coverpicture"
                    className="cover"
                  /> : <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwJHtrA3c6twCYZPlOkAsZG1QcjGW04SyPqA&usqp=CAU"
                    alt="Coverpicture"
                    className="cover"
                  />
                } */}
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
                    <span>{userDetails.userName}</span>
                    {
                        isFollowing ? <button onClick={handleUnfollow}>Remove Follower</button> : <button onClick={handleFollowUser} >Follow</button>
                    }
                  </div>
                </div>
                <div className='userPosts'>

                  {posts.map(post => (
                     <Post post={post} key={post._id}/>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
       
        <RightBar />
      </div>  
      <Toaster/>
    </div>
  )
}

export default UserProfiles