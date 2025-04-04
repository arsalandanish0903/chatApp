import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { registerUserThunk } from '../../../store/slice/user/user.thunk'
import toast from 'react-hot-toast'
function Signup() {
    const [signupData, setSignupData] = useState({
        fullName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        gender: '',
    })
    const { isAunthenticated } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAunthenticated) {
            navigate('/')
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setSignupData({
            ...signupData,
            [name]: type === 'radio' ? (checked ? value : '') : value
        })
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        if (signupData.password !== signupData.confirmPassword) {
            return toast.error('Passwords and Confirm Password do not match',)
        }
        const response = await dispatch(registerUserThunk(signupData))

        if (response?.payload?.success) {
            navigate("/")
        }
    }
    return (
        <div className='h-screen w-full flex items-center justify-center bg-gray-900 px-6 lg:px-0'>
            <div className='bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full'>
                <h2 className='text-3xl font-bold text-center text-blue-400 mb-6'>Signup</h2>
                <form className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-300'>Full Name</label>
                        <input
                            type='text'
                            className='w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                            placeholder='Enter your full name'
                            onChange={handleInputChange}
                            name='fullName'
                            value={signupData.fullName}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-300'>Username</label>
                        <input
                            type='text'
                            className='w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                            placeholder='Enter your username'
                            onChange={handleInputChange}
                            name='userName'
                            value={signupData.userName}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-300'>Password</label>
                        <input
                            type='password'
                            className='w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                            placeholder='Enter your password'
                            onChange={handleInputChange}
                            name='password'
                            value={signupData.password}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-300'>Confirm Password</label>
                        <input
                            type='password'
                            className='w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                            placeholder='Confirm your password'
                            onChange={handleInputChange}
                            name='confirmPassword'
                            value={signupData.confirmPassword}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-300'>Gender</label>
                        <div className='flex space-x-4'>
                            <div className='flex items-center space-x-2'>
                                <input
                                    type='radio'
                                    id='male'
                                    name='gender'
                                    value='male'
                                    checked={signupData.gender === 'male'}
                                    onChange={handleInputChange}
                                />
                                <label className='text-white' htmlFor='male'>Male</label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <input
                                    type='radio'
                                    id='female'
                                    name='gender'
                                    value='female'
                                    checked={signupData.gender === 'female'}
                                    onChange={handleInputChange}
                                />
                                <label className='text-white' htmlFor='female'>Female</label>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleSignup}
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                        Signup
                    </button>
                </form>
                <p className='text-sm text-center text-gray-400 mt-4'>
                    Already have an account?
                    <Link to="/login" className='text-blue-400 cursor-pointer hover:underline'> Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
