import { createSlice } from "@reduxjs/toolkit";

const initialState={
    adminToken:null
}

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdminLogin:(state,action)=>{
            state.adminToken=action.payload;
        },
        setAdminLogout:(state)=>{
            state.adminToken=null
            
        }
    }
})

export const {setAdminLogin} =adminSlice.actions;

export default adminSlice.reducer