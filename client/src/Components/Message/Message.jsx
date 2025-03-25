import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function Message({ messageDetails }) {
  const { userProfile } = useSelector(state => state.userReducer);

  const isSender = userProfile?._id === messageDetails?.senderId;
  const messageRef = useRef(null)

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`} >
      <div
      ref={messageRef}
      className={`flex items-start gap-4 bg-blue-500/20 p-4 rounded-2xl shadow-md w-max max-w-xs ${isSender ? 'self-end' : 'self-start'}`}>
        <img src="/usermale.png" alt="User" className='w-14 h-14 rounded-full border-2 border-blue-500' />
        <div>
          <p className='text-gray-300 text-sm'>{messageDetails?.message}</p>
          <p className='text-gray-400 text-xs text-right mt-1'>3:50 AM</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
