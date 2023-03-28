import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode:"light",
    user:null,
    token:null,
    posts:[]
}

export const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode=state.mode === "light" ? "dark" : "light";
        },
        setLogin : (state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
            
        },
        setLogout:(state)=>{
            state.user=null
            state.token=null
        },
        setFriends:(state,action)=>{
            if(state.user){
                state.user.friends=action.payload.friends
            }
        },
        setPosts:(state,action)=>{
            state.posts=action.payload.posts
        },
        setPost:(state,action)=>{
            const updatedPost =  state.posts.map((post)=>{
                if(post._id ===  action.payload.post_id) return action.payload.post;
                return post;
            })
            state.posts=updatedPost
        },
        setProfilepic:(state,action)=>{
            state.user.profilePic=action.payload.imageUrl
        }

    }
})

export const {setMode , setLogin, setLogout,setFriends, setPost ,setPosts,setProfilepic} = authSlice.actions

export default authSlice.reducer;
