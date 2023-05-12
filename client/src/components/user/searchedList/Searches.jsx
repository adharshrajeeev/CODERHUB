import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'
import { SEARCH_ALL_USERS } from '../../../utils/ConstUrls';
import { useNavigate } from 'react-router-dom';



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



function Searches() {

  const [userSearchName, setSearchUserName] = useState("");
  const [searchError, setSearchErr] = useState(true)
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    if (e.target.value.trim() === "") {
      setSearchErr(true)
    } else {
      setSearchErr(false)
    }

    setSearchUserName(e.target.value)
  }


  const handleSearchSubmit = async () => {
    if (searchError) {
      toast.error("Please fill the search", {
        position: "top-right"
      })
    } else {

      axios.get(`${SEARCH_ALL_USERS}?userSearchName=${userSearchName}`, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } }).then((response) => {
        setSearchUserName("")
        navigate('/searchResults', { state: { data: response.data } })
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  return (
 
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={userSearchName} onChange={handleSearchChange}
        />
        <SearchOutlinedIcon onClick={handleSearchSubmit} />
      </div>

  )
}

export default Searches