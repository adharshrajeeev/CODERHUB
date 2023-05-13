import React, { useEffect, useState } from 'react'
import './profileStyle.scss';
import { useDispatch, useSelector } from 'react-redux';
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { setCoverPic, setPosts, setProfilepic } from '../../../redux/userSlice'
import Post from '../../../components/user/post/Post';
import toast, { Toaster } from 'react-hot-toast';
import { addUserCoverPhoto, addUserProfileImage, fetchUserDetails, fetchUserPosts } from '../../../api/UserServices';
import decodeToken from '../../../utils/Services';
import PeopleIcon from '@mui/icons-material/People';
import { Stack } from '@mui/material';
import ProfileEditButton from '../../../components/user/modals/ProfileEditButton';
import NewNavbar from '../../../components/user/navbar/NewNavbar';
import AddProfileModal from '../../../components/user/modals/AddProfileModal';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

function Profile() {




  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userId = decodeToken();
  const profilePic = useSelector((state) => state.user?.user?.profilePic);
  const userName = useSelector((state) => state.user?.user?.userName)
  const coverPic = useSelector((state) => state.user?.user?.coverPic)
  const userdetails = useSelector((state) => state.user?.user)
  const userPosts=useSelector((state)=>state.user?.posts)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setPreview(null) }
  const [coverLoading, setCoverLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState("");
  const [previewPro, setPreview] = useState(null);

  const [openCover, setOpenCover] = useState(false);
  const handleOpenCover = () => setOpenCover(true);
  const handleCloseCover = () => setOpenCover(false);
  const [coverPicture, setCoverPicture] = useState("");


  const [openModal,setOpenModal]=useState(false)
  const dispatch = useDispatch();


  const token = localStorage.getItem('token')

  const getUserPosts = async () => {
    try {
      const response = await fetchUserPosts(userId)
      dispatch(setPosts(response.data.posts))
    } catch (err) {
      console.log(err)
      console.log("error is getting user posts profile")
    }
  }

  const handleCoverChange = (e) => {
    setCoverPicture(e.target.files[0])
  }

  const handleCoverSubmit = async (e) => {
    e.preventDefault();
    if (coverPicture === "") {
      return toast.error("oops cannot send null image")
    }
    setCoverLoading(true)
    const formData = new FormData();
    formData.append('image', coverPicture);
    try {
    
      const response = await addUserCoverPhoto(userId,formData)
      setCoverLoading(false)
      handleCloseCover();
      dispatch(setCoverPic(response?.data.coverUrl))
      toast.success("USER COVER PICTURE ADDED")
    } catch (err) {
      setCoverLoading(false);
      handleCloseCover();
      toast.error("Ops Something went wrong")
    }

  }

  const handleChangeImg = (e) => {
    setProfilePicture(e.target.files[0]);
    setPreview(e.target.files[0])
  }

  const handleImageSumbit = async (e) => {

    e.preventDefault();
    if (profilePicture === "") {
      return alert("oops cannot send null image")
    }


    const formData = new FormData();
    formData.append('image', profilePicture);
    try {
      const response = await addUserProfileImage(userId,formData);
      handleClose();
        dispatch(setProfilepic(response?.data.imageUrl))
        toast.success("USER IMAGE UPDATED")
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }

  }

  useEffect(() => {
    fetchUserDetails();
    getUserPosts();

  }, [])

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
                  coverPic ? <img
                    src={coverPic}
                    alt="Coverpicture"
                    className="cover"
                    onClick={handleOpenCover}
                  /> : <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwJHtrA3c6twCYZPlOkAsZG1QcjGW04SyPqA&usqp=CAU"
                    alt="Coverpicture"
                    className="cover"
                    onClick={handleOpenCover}
                  />
                }

                <img
                  src={profilePic}
                  alt=""
                  className="profilePic"
                  onClick={()=>setOpenModal(true)}
                />
               
                <AddProfileModal setOpenModal={setOpenModal} openModal={openModal} userId={userId}/>
                <Modal                                            //MODAL FOR COVER PICTURE CHANGE
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openCover}
                  onClose={handleCloseCover}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500, 
                    },
                  }}
                >
                  <Fade in={openCover}>
                    <Box sx={style} borderRadius={5}>
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                        ADD COVER PICTURE
                      </Typography>
                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleCoverSubmit}>
                          <label htmlFor="myfile">Select a file: </label>
                          <input accept="image/*" type="file" name="file" onChange={handleCoverChange} />

                          {

                            coverLoading ? (<LoadingButton loading variant="outlined">
                              Submit
                            </LoadingButton>) :

                              <Button variant="contained" size="small" type='submit'>
                                Submit
                              </Button>
                          }
                        </form>
                      </Typography>
                    </Box>
                  </Fade>
                </Modal>
              </div>
              <div className="profileContainer">
                {/* <CreateIcon fontSize='small' className='editIcon'/> */}
                <div className="uInfo">

                  <div className="center">
                    <Box>
                      <Stack direction={"column"} alignItems={"center"}>
                        <span style={{ marginTop: "100px" }} >{userName}</span>

                      </Stack>

                    </Box>
                    <Box>
                      {userdetails?.gender} / {userdetails?.userBio}
                    </Box> 

                    <Box >
                      <Stack direction={"row"} spacing={2}>
                        <Button variant="outlined" startIcon={<PeopleIcon />}>
                          {userdetails?.followers?.length} Followers
                        </Button>
                        <Button variant="outlined" startIcon={<PeopleIcon />}>
                          {userdetails?.following?.length !== 0 ? userdetails?.following?.length : 0} Followings
                        </Button>
                      </Stack>
                    </Box>
                    <Stack direction="row" justifyContent="end">
                      <ProfileEditButton userId={userId} userBio={userdetails?.userBio} token={token} />
                    </Stack>
                    <div className='details'>
                    </div>
                  </div>
                </div>
                <div className='userPosts'>

                  {userPosts.map(post => (
                    <Post post={post} key={post._id} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </div>

  )
}

export default Profile