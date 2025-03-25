import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux'
import { loginUserThunk } from '../../../store/slice/user/user.thunk'
function Login() {
    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    })
    const {isAuthenticated} = useSelector(state=>state.userReducer)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // useEffect(() => {
        
    // }, [])
    if (isAuthenticated) {
        navigate('/')
    }

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await dispatch(loginUserThunk(loginData))
        if (response?.payload?.success) {
            navigate("/")
        }
    }
    return (
        <div className='h-screen w-full flex items-center justify-center bg-gray-900 px-6 lg:px-0'>
            <div className='bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full'>
                <h2 className='text-3xl font-bold text-center text-blue-400 mb-6'>Login</h2>
                <form className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-300'>Enter User Name</label>
                        <input
                            type='text'
                            className='w-full px-4 py-2 mt-1 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                            placeholder='Enter User Name'
                            onChange={handleInputChange}
                            name='userName'
                            value={loginData.userName}
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
                            value={loginData.password}
                        />
                    </div>
                    <button
                        type='submit'
                        onClick={handleLogin}
                        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                        Login
                    </button>
                </form>
                <p className='text-sm text-center text-gray-400 mt-4'>Don't have an account? <Link to="/signup" className='text-blue-400 cursor-pointer hover:underline'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login