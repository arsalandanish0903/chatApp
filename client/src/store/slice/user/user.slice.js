import { createSlice } from "@reduxjs/toolkit"
import { getProfileUserThunk, loginUserThunk, registerUserThunk, logoutUserThunk, getOtherUserThunk } from "./user.thunk";
import { act } from "react";


const initialState = {
    isAuthenticated: false,
    userProfile: null,
    buttonLoading: false,
    screenLoading: true,
    otherUsers: null,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser"))
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            localStorage.setItem("selectedUser", JSON.stringify(action.payload))
            state.selectedUser = action.payload;
        }
    },
    extraReducers: (builder) => {

        //login
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.buttonLoading = true

        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.responseData?.user
            state.isAuthenticated = true
            state.buttonLoading = false
        });
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            state.buttonLoading = false
        });

        //register
        builder.addCase(registerUserThunk.pending, (state, action) => {
            state.buttonLoading = true

        });
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.responseData?.user
            state.isAuthenticated = true
            state.buttonLoading = false
        });
        builder.addCase(registerUserThunk.rejected, (state, action) => {
            state.buttonLoading = false
        });

        // logut
        builder.addCase(logoutUserThunk.pending, (state, action) => {
            state.buttonLoading = true

        });
        builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.userProfile = null
            state.isAuthenticated = false
            state.buttonLoading = false
            state.otherUsers = null
            state.selectedUser = null
            localStorage.clear();
        });
        builder.addCase(logoutUserThunk.rejected, (state, action) => {
            state.buttonLoading = false
        });

        //get profile
        builder.addCase(getProfileUserThunk.pending, (state, action) => {
            state.screenLoading = false
        });
        builder.addCase(getProfileUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = false
            state.screenLoading = false
            // console.log(action.payload?.responseData);
            state.userProfile = action.payload?.responseData
        });
        builder.addCase(getProfileUserThunk.rejected, (state, action) => {
            state.screenLoading = false
        });

        //get other users
        builder.addCase(getOtherUserThunk.pending, (state, action) => {
            state.screenLoading = false
        });
        builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
            state.otherUsers = action.payload?.responseData;
            state.screenLoading = false
        });
        builder.addCase(getOtherUserThunk.rejected, (state, action) => {
            state.screenLoading = false
        });
    }
})
export const { setSelectedUser } = userSlice.actions
export default userSlice.reducer 