import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Pages/Home/Home';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import UserProfile from './Components/Pages/Dashboard/UserProfile';
import AddTagPost from './Components/Pages/Dashboard/AddTagPost';
import Mypost from './Components/Pages/Dashboard/Mypost';
import JoinUs from './Components/Pages/JoinUs/JoinUs';
import Membership from './Components/Pages/MemberShip/Membership';
import Authcontext from './Authprovider/Authcontext';
import ShowDetails from './Components/Pages/ShowDetails/ShowDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserManage from './Components/Pages/Dashboard/ManageUser/UserManage';
import AdminProfile from './Components/Pages/Dashboard/AdminProfile/AdminProfile';
import ShowAllComment from './Components/Pages/Dashboard/ShowAllComment';
import Register from './Components/Pages/JoinUs/Register';
import Allreport from './Components/Pages/Dashboard/Allreport/Allreport';
import Announcement from './Components/Pages/Dashboard/MakeAnnouncement/Announcement';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/membership',
        element: <Membership></Membership>
      },
      {
        path: '/getaddpost/:id',
        element: <ShowDetails></ShowDetails>,
        loader: () => fetch('https://assignment-12-server-site-pi.vercel.app/getaddpost')
      },
      {
        path : '/comment/:id',
        element : <ShowAllComment></ShowAllComment>,
        loader : () => fetch(`https://assignment-12-server-site-pi.vercel.app/comment`)
      }
    ]
  },
  {
    path: '/joinus',
    element: <JoinUs></JoinUs>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'myprofile',
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
      },
      {
        path: 'addpost',
        element: <PrivateRoute><AddTagPost></AddTagPost></PrivateRoute>
      },
      {
        path: 'mypost',
        element: <PrivateRoute><Mypost></Mypost></PrivateRoute>
      },
      {
        path: 'manageuser',
        element: <PrivateRoute><UserManage></UserManage></PrivateRoute>
      },
      {
        path : 'adminprofile',
        element : <PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>
      },
      {
        path : 'allReport',
        element : <PrivateRoute><Allreport></Allreport></PrivateRoute>
      },
      {
        path : 'announcement',
        element : <PrivateRoute><Announcement></Announcement></PrivateRoute>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Authcontext>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Authcontext>
  </QueryClientProvider>
)
