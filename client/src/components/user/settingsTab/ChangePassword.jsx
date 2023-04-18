import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormLabel from '@mui/joy/FormLabel';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

function ChangePassword() {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showNewPassword,setShowNewPassword]=useState(false);
    const handleShowNewPassword = ()=> setShowNewPassword((shownew)=>!shownew)

    const [showReNewPassword,setReNewPassword]=useState(false);
    const handleShowReNewPassword = ()=> setReNewPassword((showRenew)=>!showRenew)


    const [currentPassword,setCurrentPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassoword,setConfirmPassword]=useState("");


    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Stack spacing={2}>
                <FormControl  variant="outlined">
                    <FormLabel>Type your current password</FormLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={currentPassword}
                        onChange={(e)=>setCurrentPassword(e.target.value)}
                        required
                        size='small'
                    />
                </FormControl>
                <FormControl variant="outlined">
                    <FormLabel>Type your new password</FormLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowNewPassword}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                        required
                        size='small'
                    />
                </FormControl>
                <FormControl  variant="outlined">
                    <FormLabel>Retype your new password</FormLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showReNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowReNewPassword}
                                    edge="end"
                                >
                                    {showReNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={confirmPassoword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required
                        size='small'
                    />
                </FormControl>
                <Button sx={{width:'23ch'}}   variant="contained">Save</Button>
                <Button sx={{width:'23ch'}} mt={1}  size='small' variant="outlined">Forgot Password</Button>
            </Stack>
        </Box>
    )
}

export default ChangePassword 