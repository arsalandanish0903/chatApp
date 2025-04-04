
import User from "../models/user.model.js"
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = asyncHandler(async (req, res, next) => {
    const { fullName, userName, password, gender } = req.body
    if (!fullName || !userName || !password || !gender) {
        return next(new errorHandler("All Feilds Are Required"))
    }
    const user = await User.findOne({ userName })
    if (user) {
        return next(new errorHandler("User Name Already Exist"))
    }
    const avatarType = gender === "male" ? "boy" : "girl";
    const avtaar = `https://avatar.iran.liara.run/public/${avatarType}?username=${userName}`;

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        fullName,
        userName,
        password: hashPassword,
        gender,
        avtaar
    })

    const tokenData = {
        _id: newUser?._id
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})

    res.status(200)
    .cookie("token", token,  {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
    .json({
        success: true,
        responseData: {
            newUser,
            token
        }
    })
})

export const login = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return next(new errorHandler("Please Enter Valid userName or Password"));
    }

    const user = await User.findOne({ userName });
    if (!user) {
        return next(new errorHandler("Please Enter Valid userName or Password"));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return next(new errorHandler("Please Enter Valid userName or Password"));
    }

    const tokenData = { _id: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    // ✅ Set Cookie Correctly
    res.status(200)
        .cookie("token", token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  // ✅ Only secure in production
            sameSite: "None",  // ✅ Needed for cross-site cookies
        })
        .json({
            success: true,
            responseData: {
                user,
                token
            }
        });
});


export const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    // console.log(userId);
    const profile = await User.findById(userId)
    res.status(200).json({
        success: true,
        responseData: profile
    })
    
})

export const logout = asyncHandler(async (req, res, next) => {
    res.status(200)
    .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    .json({
        success: true,
        message: "Logged out successfully"
    })
})

export const getOtherUser = asyncHandler(async (req, res, next) => {
    const otherUsers = await User.find({
        _id: { $ne: req.user?._id }
    })
    
    res.status(200).json({
        success: true,
        responseData: otherUsers
    })
})

