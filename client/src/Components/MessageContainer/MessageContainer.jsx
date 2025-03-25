import React, { useEffect } from 'react';
import User from '../User/User';
import Message from '../Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/message.thunk';
import SendMessage from '../sendMessage/sendMessage';

function MessageContainer() {
  const dispatch = useDispatch()
  const { selectedUser } = useSelector(state => state.userReducer)
  const { messages } = useSelector(state => state.messageReducer)



  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }))
    }
  }, [selectedUser])

  return (
    <>
      {!selectedUser ? (
        <div className='w-full flex items-center justify-center bg-gray-800'>
          <p className='text-white'>please select the user</p>
        </div>
      ) : (
        <>
          <div className='bg-gradient-to-b from-gray-900 to-gray-800 h-screen flex flex-col w-full text-white'>
            {/* User Section */}
            <div className='border-b border-gray-700 py-4 px-6'>
              <User userDetails={selectedUser} />
            </div>

            {/* Message Section */}
            <div className='h-full overflow-y-auto p-4 space-y-4'>
              {messages?.map((messageDetails) => {

                return (
                  <Message key={messageDetails?._id} messageDetails={messageDetails} />
                )
              })}
            </div>

            <SendMessage />
          </div>
        </>
      )}
    </>
  );
}

export default MessageContainer;