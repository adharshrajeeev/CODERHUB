import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import toast,{Toaster} from 'react-hot-toast'
import axios from '../../../utils/axios'
import { ADD_USER_BIO } from '../../../utils/ConstUrls';
import { useDispatch } from 'react-redux';
import { addUserBio } from '../../../redux/userSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  

function ProfileEditButton({userId,userBio,token}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate=useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null); 
    };

    const [modalOpen,setModalOpan]=React.useState(false);
    const handleModalOpen = ()=> setModalOpan(true);
    const handleModalClose = () =>{ 
        setModalOpan(false);
        setUserBio("")
        setBioErr({nullValue:false,maxSize:false})
    }
    
    const [buttonDisable,setButtonDisable]=React.useState(true)
    const [Bio,setUserBio]=React.useState("")
    const [BioError,setBioErr]=React.useState({nullValue:false,maxSize:false});
    const dispatch=useDispatch();

    const handleBioChange = (data)=>{
        setUserBio(data)
        if(data?.trim()==""){
            setBioErr({nullValue:true})
            setButtonDisable(true)
        }else if( data?.trim().length > 10){
            setBioErr({maxSize:true})
            setButtonDisable(true)
        }else{
            setUserBio(data)
            setBioErr({nullValue:false})
            setButtonDisable(false)

        }


    }

    const handleBioSubmit = async()=>{
        try{
            const body={
                Bio,userId
            }
          const res =await  axios.post(ADD_USER_BIO,body,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } });
          dispatch(addUserBio(Bio)) 
          handleModalClose();
          toast.success(res.data.message)
        }catch(err){
            toast.error("Ops Somethng went wrong")
        }
    }

  return (
    <>
    <MoreHorizIcon aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}/>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose} 
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>navigate('/settings')}>Edit Profile</MenuItem>
       {!userBio && <MenuItem onClick={handleModalOpen}>Add Bio</MenuItem>} 
      </Menu>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User Bio 
          </Typography>
          <Box component="form"
       sx={{
        width: 500,
        maxWidth: '100%',
      }}
          noValidate
          autoComplete="off">
            <Stack marginTop={3}>

         <TextField
          id="outlined-multiline-static"
          fullWidth
         size='large'
         variant="standard"
         value={Bio}
         onChange={(e)=>handleBioChange(e.target.value)}
        />
        {BioError.nullValue && <span style={{color:"red"}}>Please Fill the column</span> }
        {BioError.maxSize && <span style={{color:"red"}}>Max CharSize is 10</span> }
        <Stack marginTop={2}>

        <Button variant="contained" onClick={handleBioSubmit} disabled={buttonDisable}>Save</Button>
        </Stack>
            </Stack>
          </Box>
        </Box>
      </Modal>
      <Toaster/>
    </>

  )
}

export default ProfileEditButton