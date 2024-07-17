import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status: false,
    userDta:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userDta=action.payload;
        },
        logout:(state,action)=>{
            state.status=false;
            state.userDta=null;
        }
    }
});
export const {login,logout} = authSlice.actions;
export default authSlice.reducer;