
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from "react-redux"
import Home from './Pages/Home/Home.jsx'
import ProtectedRoute from "./Components/ProtectedRoute.jsx"
import Login from "./Pages/Authentication/Login/Login.jsx"
import Signup from "./Pages/Authentication/Signup/Signup.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
    <RouterProvider router={router}/>
  </Provider>

)
