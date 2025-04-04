import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../../Components/utilities/axiosInstance"
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk("user/login", async ({ userName, password }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/login", {
            userName,
            password
        })
        toast.success("Login Successful!!")
        return response.data
    } catch (error) {
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput)
        return rejectWithValue(errorOutput)
    }
})
export const registerUserThunk = createAsyncThunk("user/register", async ({ fullName, userName, password, gender }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/register", {
            fullName,
            userName,
            password,
            gender
        })
        toast.success("Account Create Successful!!")
        return response.data
    } catch (error) {
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput)
        return rejectWithValue(errorOutput)
    }
})
export const logoutUserThunk = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/logout");
            toast.success("Logout successfull!!");
            return response.data;
        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    }
);
export const getProfileUserThunk = createAsyncThunk("user/get-profile", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/user/get-profile");
        return response.data;
    } catch (error) {
        const errorOutput = error?.response?.data?.errMessage || "Something went wrong";
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});
export const getOtherUserThunk = createAsyncThunk("user/getOtherUser", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/user/get-otheruser")
        return response.data
    } catch (error) {
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput)
        return rejectWithValue(errorOutput)
    }
})