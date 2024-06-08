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
        loader: () => fetch('http://localhost:5000/getaddpost')
      },
      {
        path : '/comment',
        element : <ShowAllComment></ShowAllComment>
      }
    ]
  },
  {
    path: '/joinus',
    element: <JoinUs></JoinUs>
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'dashboard/myprofile',
        element: <UserProfile></UserProfile>
      },
      {
        path: 'dashboard/addpost',
        element: <AddTagPost></AddTagPost>
      },
      {
        path: 'dashboard/mypost',
        element: <Mypost></Mypost>
      },
      {
        path: 'dashboard/manageuser',
        element: <UserManage></UserManage>
      },
      {
        path : 'dashboard/adminprofile',
        element : <AdminProfile></AdminProfile>
      }
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
