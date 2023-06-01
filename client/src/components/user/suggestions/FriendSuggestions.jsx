import React, { useEffect, useState } from 'react'
import decodeToken from '../../../utils/Services';
import {  fetchUserSuggestions } from '../../../api/UserServices';
import SuggestionCard from './SuggestionCard';

function FriendSuggestions() {

    const [userSuggestions, setUserSuggestions] = useState([])
    const userId = decodeToken();

    const fetchSuggestions = async () => {
        try {
            const response = await fetchUserSuggestions(userId)
            setUserSuggestions(response?.data?.users)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchSuggestions();
    }, [])

 

    return (
        <>
            {
                userSuggestions?.map((users) => (
                        <SuggestionCard users={users} userId={userId} setUserSuggestions={setUserSuggestions} userSuggestions={userSuggestions}/>
                ))
            }
        </>
    )
}

export default FriendSuggestions