import { createSlice } from '@reduxjs/toolkit'


const initialState ={
    mode:"light",
    user:null,
    token:null,
    posts:[],
    homePosts:[],
    explorePosts:[]
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
        setHomePosts:(state,action)=>{
            state.homePosts=action.payload
        },
        updateHomePosts:(state,action)=>{
            const updatedPost =  state.homePosts.map((post)=>{
               
                if(post._id ===  action.payload._id) return action.payload;
                return post;
            })
           
            state.homePosts=updatedPost
        },
        setExplorePosts:(state,action)=>{
            const newPosts=action.payload;
            const updatedPost=[
                ...state.explorePosts,
                ...newPosts
            ]
            state.explorePosts=updatedPost
        },
        updateExplorePosts:(state,action)=>{
            const updatedPost =  state.explorePosts.map((post)=>{
               
                if(post._id ===  action.payload._id) return action.payload;
                return post;
            })
           
            state.explorePosts=updatedPost
        },
        setProfilepic:(state,action)=>{
            state.user.profilePic=action.payload
        },
        setCoverPic:(state,action)=>{
            state.user.coverPic=action.payload
        },
        changeUserName:(state,action)=>{
            state.user.userName=action.payload
        },
        addUserBio:(state,action)=>{
            state.user.userBio=action.payload
        }
    }
})

export const {setMode , setLogin, setLogout,setFriends, setPost ,setPosts,
            setProfilepic,setCoverPic,changeUserName,addUserBio,setHomePosts,setExplorePosts,updateExplorePosts,updateHomePosts} = userSlice.actions;

export default userSlice.reducer;
