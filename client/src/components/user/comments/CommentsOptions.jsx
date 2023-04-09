import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'
import { DELETE_COMMENT } from '../../../utils/ConstUrls';
import { useDispatch } from 'react-redux';
import { setPost } from '../../../redux/userSlice';




function CommentsOptions({ postId, commentId, userId, commentedUserId }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCommentDelete = async () => {
        ;
        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("commentId", commentId)
        axios.put(DELETE_COMMENT, formData, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } }).then((response) => {
            dispatch(setPost(response.data))
            toast.success("Comment Deleted")
        }).catch((err) => {

            toast.error("Oops Something went wrong")
        })
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