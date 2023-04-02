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
        },
        getPostDetails:(state,action)=>{
            const postId=action.payload;
            console.log(postId,"id post redux")
            const post= state.posts.find((post)=>post._id===postId);
            console.log(post,"after post redux")
        }
    }
})

export const {setMode , setLogin, setLogout,setFriends, setPost ,setPosts,setProfilepic,getPostDetails} = userSlice.actions;

export default userSlice.reducer;
