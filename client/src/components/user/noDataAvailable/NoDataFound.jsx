import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



function NoDataFound({ data }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Box textAlign="center">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        No {data} Available !!!
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default NoDataFound