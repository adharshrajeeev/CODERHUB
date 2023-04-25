import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from '../../../utils/axios'
import { SHOW_USERS } from '../../../utils/ConstUrls';
import { useNavigate } from 'react-router-dom';


function SearchResults() {
    const options = ['Option 1', 'Option 2'];
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
  
    const [results,setResults]=useState([])
    const [selectedUser, setSelectedUser] = useState("");
    const navigate=useNavigate();
    const token=localStorage.getItem('token')

    const getAllUsers=async()=>{
        try{
            const res=await axios.get(SHOW_USERS,{ headers: { 'Authorization': `Bearer ${token}` } });
            setResults(res.data)
        }catch(Err){
            console.log(Err)
        }
    }

    const handleSelect = (event, value) => {
        if (value) {
          setSelectedUser(value);
            console.log(selectedUser,"selected")
        }
      };
    
    useEffect(()=>{
        getAllUsers();
    },[])

    // const handleSearchInput = (userInput)=>{
    //     var filteredResults=results.filter((x)=>{
    //         return x.includes(userInput)
    //     })
    // }

  return (
    <div>
   
   <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        const user=results.find((u)=>u.userName===inputValue);
        console.log(user,"userdetials")
      }}
      id="controllable-states-demo"
      options={results.map((option)=>option.userName)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} />}
    />

  </div>
  )
}

export default SearchResults