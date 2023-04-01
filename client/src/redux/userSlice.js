import { createSlice } from '@reduxjs/toolkit'


const initialState ={
    mode:"light",
    user:null,
    token:null,
    posts:[]
}

const userSlice=createSlice({
    name:"user",
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
            state.posts=action.payload
        },
        setPost:(state,action)=>{
    
            const updatedPost =  state.posts.map((post)=>{
               
                if(post._id ===  action.payload._id) return action.payload;
                return post;
            })
           
            state.posts=updatedPost
           
        },
        setProfilepic:(state,action)=>{
            state.user.profilePic=action.payload
        }
    }
})

export const {setMode , setLogin, setLogout,setFriends, setPost ,setPosts,setProfilepic} = userSlice.actions;

export default userSlice.reducer;
