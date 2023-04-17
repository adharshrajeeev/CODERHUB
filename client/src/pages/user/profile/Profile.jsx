import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import { ADD_COVERPICTURE, ADD_PROFILEIMAGE, SHOW_USER_POST } from '../../../utils/ConstUrls';
import { useDispatch, useSelector } from 'react-redux';
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';     
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { setCoverPic, setProfilepic } from '../../../redux/userSlice'
import Post from '../../../components/user/post/Post';
import toast, { Toaster } from 'react-hot-toast';
import './profileStyle.scss';
import { fetchUserDetails } from '../../../api/UserServices';
import decodeToken from '../../../utils/Services';





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




  const [posts, setPosts] = useState([]);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userId = decodeToken();
  const profilePic = useSelector((state) => state.user?.user?.profilePic);
  const userName = useSelector((state) => state.user?.user?.userName)
  const coverPic = useSelector((state) => state.user?.user?.coverPic)
  const userdetails = useSelector((state) => state.user?.user)

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
  const dispatch = useDispatch();



  const getUserPosts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${SHOW_USER_POST}/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      setPosts(response.data.posts.filter((post) => post.postedUser._id === userId))

    } catch (err) {
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
      const token = localStorage.getItem('token')
      const { data } = await axios.post(`${ADD_COVERPICTURE}/${userId}`, formData, { headers: { 'Authorization': `Bearer ${token}` } })
      if (data.success) {
        setCoverLoading(false)
        handleCloseCover();
        dispatch(setCoverPic(data.coverUrl))
        toast.success("USER COVER PICTURE ADDED")

      } else {
        setCoverLoading(false)
        handleCloseCover();
        toast.error("Ops Something went wrong Try Again Later")
      }
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
      const token = localStorage.getItem('token')
      const { data } = await axios.post(`${ADD_PROFILEIMAGE}/${userId}`, formData, { headers: { 'Authorization': `Bearer ${token}` } })
      console.log(data)
      if (data.success) {
        handleClose();
        dispatch(setProfilepic(data.imageUrl))
        toast.success("USER IMAGE UPDATED")

      } else {
        alert(data.message)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    fetchUserDetails();
    getUserPosts();

  }, [])


  return (

    <div>
      <Navbar />
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
                  onClick={handleOpen}
                />
                <Modal                                              //MODAL FOR PROFILE PICTURE CHANGE
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style} borderRadius={5}>
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                        ADD USER IMAGE
                      </Typography>
                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleImageSumbit}>
                          <label htmlFor="myfile">Select a file:</label>
                          <input accept="image/*" type="file" name="file" onChange={handleChangeImg} />
                          {previewPro && <input className='profileButtonSubmit' type="submit" />}
                        </form>
                        {previewPro && <img src={previewPro && URL.createObjectURL(previewPro)} style={{ width: "50px", height: "50px" }} alt="profilePicture" />}
                      </Typography>
                    </Box>
                  </Fade>
                </Modal>
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

                    <span style={{ marginTop: "50px" }}>{userName}</span>
                    {/* {userdetails?.gender === 'Male' ? <MaleIcon /> : <FemaleIcon />}
                    <p>{userdetails?.bio}</p> */}
                    <div className='details'>
                    
                    </div>
                  </div>
                </div>
                <div className='userPosts'>

                  {posts.map(post => (
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
        {/* <RightBar /> */}
      </div>
    </div>

  )
}

export default Profile