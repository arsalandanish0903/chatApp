import React, { useEffect, useState } from 'react';
import User from '../User/User';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserThunk, logoutUserThunk } from '../../store/slice/user/user.thunk';
import { useNavigate } from 'react-router-dom';
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";

function UserSidebar() {
    const { otherUsers } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logoutUserThunk());
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        (async () => {
            await dispatch(getOtherUserThunk());
        })();
    }, []);

    useEffect(() => {
        if (!searchValue) {
            setUsers(otherUsers);
        } else {
            setUsers(otherUsers?.filter((user) =>
                user.userName.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.fullName.toLowerCase().includes(searchValue.toLowerCase())
            ));
        }
    }, [searchValue, otherUsers]);

    return (
        <>
            {/* Mobile Menu Icon */}
            <div className='p-4 z-50 flex relative md:hidden bg-gray-800'>
                <h1 className='text-white text-2xl font-bold hidden lg:block'>Chat App</h1>
                {isSidebarOpen
                    ? <IoClose onClick={toggleSidebar} className='text-white text-3xl cursor-pointer' />
                    : <IoMenu onClick={toggleSidebar} className='text-white text-3xl cursor-pointer' />}
            </div>

            {/* Sidebar for Mobile & Desktop */}
            <div className={`fixed top-0 left-0 h-screen lg:w-96 w-64 bg-gray-800 transition-transform duration-300 z-50 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0`}>
                <div className='h-screen flex flex-col pt-6 border-r border-gray-700 w-full'>
                    <div className='text-center pb-4 border-b border-gray-700'>
                        <h1 className='text-2xl text-white font-bold hidden md:block'>Chat App</h1>
                    </div>

                    <div className='mx-4 flex items-center relative'>
                        <IoSearch className='absolute right-8 text-white' />
                        <input
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text"
                            className='w-full p-2 text-black rounded-md focus:outline-none'
                            placeholder='Search'
                        />
                    </div>

                    <div className='h-full overflow-y-auto p-4 space-y-4'>
                        {users?.map((userDetails) => (
                            <User key={userDetails?._id} userDetails={userDetails} />
                        ))}
                    </div>

                    <div className='p-4 border-t border-gray-700'>
                        <button
                            onClick={handleLogout}
                            className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for Mobile (when sidebar is open) */}
            {isSidebarOpen && (
                <div
                    className='fixed inset-0 bg-black opacity-50 md:hidden'
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}

export default UserSidebar;
