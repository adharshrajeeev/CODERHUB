import React, { startTransition, useState } from 'react'
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography'; 
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../utils/axios'
import { ADD_POST } from '../../../utils/ConstUrls';
import { setExplorePosts, setHomePosts, setPosts } from '../../../redux/userSlice';
import { useLocation } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast'
import { fetchExplorePosts, fetchUserFriendsPosts, fetchUserPosts } from '../../../api/UserServices';

function AddPostAndVideo() {
    const [open, setOpen] = useState(false);
    const [loading,setLoading]=useState(false)

    const token=localStorage.getItem('token');
    const location=useLocation();
    const dispatch=useDispatch();
    const userId=useSelector((state)=>state.user?.user?._id)
    const userName=useSelector((state)=>state.user?.user?.userName);
    const profilePic=useSelector((state)=>state.user?.user?.profilePic);

    const [formError,setFormError]=useState({contentError:true,postDataError:true});
    const [postFile,setPostFile]=useState({image:null,video:null})
    const [content,setPostContent]=useState("");


    const handleFileChange = (e)=>{ 
        const file = e.target.files[0];
        if (isImage(file) ) {
           setPostFile({image:file})
            setFormError({postDataError:false})
          }else if(isVideo(file)){
            setPostFile({video:file})
            setFormError({postDataError:false})
          }
           else {
            setFormError({postDataError:true})
          }
          function isImage(file) {
            return file.type.startsWith("image/");
          } 
          
          function isVideo(file) {
            return file.type.startsWith("video/");
          } 
    }


    const handleContentChange = (e)=>{
        if(e.target.value.trim()===""){
            setFormError({contentError:true})
        }else{
           
            setFormError({contentError:false})

        }
        setPostContent(e.target.value)
    }


    const handlePostSubmit = async()=>{
        setLoading(true);
        const formData=new FormData();
        formData.append("userId",userId);
        formData.append("content",content);
        formData.append("userName",userName);
        formData.append("profilePic",profilePic)
        if(postFile.image && content){
            formData.append('contentImg',true)
            formData.append('image',postFile.image)
        }

        if(postFile.video && content){
            formData.append('contentVideo',true)
            formData.append("my-video",postFile.video)
        }
        if(postFile.image && content.length===0){
             formData.append('imageContent',true)
            formData.append('image',postFile.image)
        }

        if(postFile.video && content.length===0){
            formData.append('videoContent',true)
            formData.append("my-video",postFile.video)
        }
        try{
           
            const response=await axios.post(ADD_POST,formData,{ headers: {'Authorization':`Bearer ${token}` } });
            if(response.data.success){
                setLoading(false);
                if(location.pathname=='/home'){
                  const response=fetchUserFriendsPosts(userId)
                  dispatch(setHomePosts(response.data))
                }else if(location.pathname=='/explore'){
                  
                  const response=await fetchExplorePosts(userId)
                  dispatch(setExplorePosts(response.data))
                 
                }else{  
                  
                  const response = await fetchUserPosts(userId)
                  dispatch(setPosts(response.data.posts));
                }
                setPostContent("")
                setOpen(false)
        
              }else{
               
                setPostContent("")
                setOpen(false)
                setLoading(false);
                toast.error("oops something went wrong")
              }
        }catch(Err){
            console.log(Err,"postadd errro")
        }
    }

    return ( 
      <React.Fragment>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
          
        >
          New post
        </Button>
        <Modal open={open} onClose={() =>{ setOpen(false)
        setLoading(false)
        }}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              Add new Post
            </Typography>
            <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
              Fill in the information of the project.
            </Typography>
          
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Content</FormLabel>
                  <Textarea placeholder="Type anything…" value={content} onChange={handleContentChange} minRows={2} />
                  <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
                    add Image/video 
                 </Typography>
                  <input type="file" style={{color:"blue"}} id="myfile"  onChange={handleFileChange}  accept="image/*,video/*" name="myfile"/>
                </FormControl>
                <Button onClick={handlePostSubmit} loading={loading} disabled={formError.contentError || formError.postDataError} type="submit">Submit</Button>
              </Stack>
          
          </ModalDialog>
        </Modal>
        <Toaster/>
      </React.Fragment>
    );
}

export default AddPostAndVideo