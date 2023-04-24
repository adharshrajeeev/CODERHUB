import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from '../../../utils/axios'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


function AllFriends({users,currentUser}) {
    return (

        <Box sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            backgroundColor: "#F8FAFF",
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}>
            <Stack spacing={2} sx={{ maxHeight: "100vh" }}>
                <Stack direction="row"
                    alignItems={"center"}
                    justifyContent="space-between" >

                    <Stack direction='row' spacing={2} >
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={users.profilePic} />
                        </StyledBadge>
                        <Stack spacing={0.3}>
                            <Typography variant='subtitle2'>
                              {users.userName}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack spacing={2} alignItems={'center'}>
                        {/* <Typography sx={{ fontWeight: 600 }} variant='caption'>
                            9:26
                        </Typography> */}
                        {/* <Badge color='primary' badgeContent={3}>

                        </Badge> */}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default AllFriends