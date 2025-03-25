import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../store/slice/user/user.slice';

function User({userDetails}) {
  const {selectedUser} = useSelector(state=> state.userReducer)
  // const {onlineUsers} = useSelector(state=>state.socketReducer)
  
  const dispatch = useDispatch()

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails))
  }

  return (
    <div onClick={handleUserClick} className={`flex items-center gap-4 p-2 hover:bg-gray-500 cursor-pointer  ${userDetails?._id === selectedUser?._id && "bg-gray-500"}`}>
      <img src="/usermale.png" alt="" className='w-14 h-14 rounded-full border-2 border-blue-500' />
      <div>
        <p className='text-white font-semibold text-lg'>{userDetails?.fullName}</p>
        <p className='text-gray-400 text-sm'>{userDetails?.userName}</p>
      </div>
    </div>
  );
}

export default User;