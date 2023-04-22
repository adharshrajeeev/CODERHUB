import { Box, Stack } from '@mui/material'
import React from 'react'
import Messages from './Messages';




function Conversation({ messages, own }) {

    return (
        <>
            {/* <Stack height={"100%"} maxHeight={"100vh"} width={"auto"} overflowY={"hidden"}> */}
                <Box width={"100%"} sx={{ flexGrow: 1 }}>
                    <Messages messages={messages} own={own} />
                </Box>
            {/* </Stack> */}
        </>
    )
}

export default Conversation
