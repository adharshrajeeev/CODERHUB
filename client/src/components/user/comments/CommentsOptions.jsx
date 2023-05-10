import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { setPost, updateExplorePosts, updateHomePosts } from '../../../redux/userSlice';
import { useLocation } from 'react-router-dom';
import { deleteComment } from '../../../api/UserServices';




function CommentsOptions({ postId, commentId, userId, commentedUserId }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const location=useLocation();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCommentDelete = async () => {
        
       
        try{

            const body={
                postId:postId,
                commentId:commentId
            }
            const response = await deleteComment(body)
            if(location.pathname==='/home'){
                dispatch(updateHomePosts(response.data))
            }else if(location.pathname==='/explore'){
                dispatch(updateExplorePosts(response.data))
            }else{
    
                dispatch(setPost(response.data))
            }
            toast.success("Comment Deleted")
        }catch(Err){
            console.log(Err)
            console.log(Err.response.data.message)
        }



       
    }

    return (
        <>
            {
                userId === commentedUserId ?
                    <MoreHorizIcon onClick={handleClick} />
                    : ""
            }
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleCommentDelete}>
                    Delete
                </MenuItem>

            </Menu>
        </>
    )

}

export default CommentsOptions