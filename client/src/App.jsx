import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {Toaster} from "react-hot-toast"
import { getOtherUserThunk, getProfileUserThunk } from './store/slice/user/user.thunk'

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    (async () => {
      await dispatch(getProfileUserThunk())
    })();
  }, [])
  
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      {/* <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router> */}

    </>
  )
}

export default App