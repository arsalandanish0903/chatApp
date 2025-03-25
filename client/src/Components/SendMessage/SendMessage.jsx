import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/message.thunk';

function SendMessage() {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const {selectedUser} = useSelector(state => state.userReducer)
    
    const handleSendMessage = () => {
        dispatch(
            sendMessageThunk({
                receiverId: selectedUser?._id,
                message,
            })
        )
        setMessage('')
    }
    return (
        <>
            {/* Input Section */}
            <div className='flex items-center gap-4 border-t border-gray-700 p-4 bg-gray-900'>
                <input
                    type="text"
                    placeholder="Type your message..."
                    className='w-full bg-gray-700 text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button
                onClick={handleSendMessage}
                className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition'>
                    Send
                </button>
            </div>
        </>
    )
}

export default SendMessage