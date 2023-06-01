import React, { useState } from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import toast,{ Toaster } from 'react-hot-toast';
import {  followUser } from '../../../api/UserServices'; 


function SuggestionCard({ users, userId ,setUserSuggestions,userSuggestions}) {
    const [loading, setLoading] = useState(false)


    const handleFollowClick = async (followerId) => {
        const body = {
            userId,
            followerId
        }
        setLoading(true)
        try {
            const response = await followUser(body)
            setLoading(false)
            const filteredUsers =  userSuggestions?.filter((user)=>user._id!==followerId)
            setUserSuggestions(filteredUsers)
            toast.success(response?.data?.message)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    return (
        <>
            <Card style={{ margin: "8px" }}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar variant="rounded" src={users?.profilePic ? users.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx687wePRshC2SLhc2L9Xu4sZHUifOnZGQQ&usqp=CAU"} />
                        <Stack spacing={0.5}>
                            <Typography style={{ marginLeft: "15px" }}>{users?.userName}</Typography>
                        </Stack>
                    </Box>
                    <LoadingButton
                        variant="contained"
                        size="small"
                        onClick={() => handleFollowClick(users?._id)}
                        loading={loading}
                    >
                        Follow
                    </LoadingButton>

                </Box>
            </Card>
            <Toaster
                position="bottom-left"
                 reverseOrder={true}
            />
        </>
    )
}

export default SuggestionCard