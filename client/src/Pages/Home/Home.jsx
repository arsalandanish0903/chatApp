import React, { useEffect } from 'react'
import UserSidebar from '../../Components/UserSidebar/UserSidebar'
import MessageContainer from '../../Components/MessageContainer/MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice'
import { setNewMessage } from '../../store/slice/message/message.slice'


function Home() {
  const { isAuthenticated, userProfile } = useSelector(state => state.userReducer)
  const { socket, onlineUsers } = useSelector(state => state.socketReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage));
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <>
      <div className='flex'>
        <UserSidebar />
        <MessageContainer />
      </div>
    </>
  )
}

export default Home