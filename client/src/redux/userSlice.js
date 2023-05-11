import { createSlice } from '@reduxjs/toolkit'


const initialState ={
    mode:"light",
    user:null,
    token:null,
    posts:[],
    homePosts:[],
    explorePosts:[],
    notifications:[]
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
            const newPosts = action.payload;
            const updatedPosts = newPosts.filter(post => !state.explorePosts.some(p => p._id === post._id));
             state.explorePosts = [...state.explorePosts, ...updatedPosts];    
        },
        setExplorePostAfterReport:(state,action)=>{
            state.explorePosts=action.payload
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
        },
        setNotification:(state,action)=>{
            state.notifications=action.payload
        },
        updateNotification:(state,action)=>{
            const updatedNotification = state.notifications.map((notification)=>{
                if(notification._id ===  action.payload._id) return action.payload
                return notification
            })
            state.posts=updatedNotification
        },
        deleteNotification:(state,action)=>{
            state.notifications=state.notifications.filter((notification)=>notification._id!==action.payload)
        }
    }
})

export const {setMode , setLogin, setLogout,setFriends, setPost ,setPosts,
            setProfilepic,setCoverPic,changeUserName,addUserBio,setHomePosts,setExplorePosts,updateExplorePosts,
            updateHomePosts,setNotification,updateNotification,deleteNotification,setExplorePostAfterReport} = userSlice.actions;

export default userSlice.reducer;
