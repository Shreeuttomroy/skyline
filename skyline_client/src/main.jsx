import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/home/Home.jsx'
import AllProperties from './Components/All_Properties/AllProperties.jsx'
import Detail from './Components/Detail/Detail.jsx'
import Login from './Authentic/Login.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import Private from './Authentic/PrivateRoute/Private.jsx'
import Profile from './Components/Dashboard/Profile/Profile.jsx'
import SignUp from './Authentic/SignUp.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Wishlist from './Components/Dashboard/Wishlist/Wishlist.jsx'
import MakeOffer from './Components/Dashboard/Wishlist/MakeOffer.jsx'
import BoughtProperties from './Components/Dashboard/PropertieBought/BoughtProperties.jsx'
import MyReviews from './Components/Dashboard/MyReviews/MyReviews.jsx'
import AddProperty from './Components/Dashboard/AddProperty/AddProperty.jsx'
import AddedProperties from './Components/Dashboard/AddedProperties/AddedProperties.jsx'
import UpdateProperty from './Components/Dashboard/AddedProperties/UpdateProperty.jsx'
import OfferedProperties from './Components/Dashboard/OfferedProperties/OfferedProperties.jsx'
import SoldProperties from './Components/Dashboard/SoldProperties/SoldProperties.jsx'
import ManageReviews from './Components/Dashboard/ManageReviews/ManageReviews.jsx'
import ManageUsers from './Components/Dashboard/ManageUser/ManageUsers.jsx'
import ManageProperties from './Components/Dashboard/ManageProperties/ManageProperties.jsx'
import ErrorPage from './Error/Error.jsx'
import Payment from './Components/Dashboard/PropertieBought/Payment/Paynow.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '',
        element: <Home></Home>
      },
      {
        path: '/allproperties',
        element: <Private><AllProperties></AllProperties></Private>
      },
      {
        path: '/details/:id',
        element: <Private><Detail></Detail></Private>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <Private><Dashboard></Dashboard></Private>,
    children: [
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'manageproperties',
        element: <ManageProperties></ManageProperties>
      },
      {
        path: 'manageusers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'managereviews',
        element: <ManageReviews></ManageReviews>
      },
      {
        path: "addproperty",
        element: <AddProperty></AddProperty>
      },
      {
        path: 'addedproperties',
        element: <AddedProperties></AddedProperties>
      },
      {
        path: 'update/:id',
        element: <UpdateProperty></UpdateProperty>
      },
      {
        path: 'soldproperties',
        element: <SoldProperties></SoldProperties>
      },
      {
        path: 'requestedproperties',
        element: <OfferedProperties></OfferedProperties>
      },
      {
        path: 'wishlist',
        element: <Wishlist></Wishlist>
      },{
        path:'paynow/:id',
        element:<Payment></Payment>
      },
      {
        path: 'propertiesbought',
        element: <BoughtProperties></BoughtProperties>
      },
      {
        path: 'myreviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: "makeoffer/:id",
        element: <MakeOffer></MakeOffer>
      },

    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
