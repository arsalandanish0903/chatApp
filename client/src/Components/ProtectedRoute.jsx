import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const {isAunthenticated, screenLoading} = useSelector(state=>state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAunthenticated && !screenLoading){
            navigate('/login')
        }
    }, [])
  return (
    children
  )
}

export default ProtectedRoute