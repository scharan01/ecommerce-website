import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState : {
        currentUser : null,
        isFetching : false,
        error : false,
    },
    reducers : {
        loginStart : (state) =>{
            state.isFetching = true;
        },
        loginSuccess : (state,action) =>{
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginfailure : (state) =>{
            state.isFetching = false;
            state.error = true;
        },
        logout : (state) =>{
            state.currentUser = null;
            state.error = false;
        },
    }
})

export const {loginStart,loginSuccess,loginfailure,logout} = userSlice.actions;
export default userSlice.reducer;
