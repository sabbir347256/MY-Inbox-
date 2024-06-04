import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar";
const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex">
                <div className=" w-64 min-h-screen bg-orange-400">
                    <ul className="menu p-4">
                        <li className="font-medium text-base"><NavLink to='dashboard/myprofile'>My Profile</NavLink></li>
                        <li className="font-medium text-base"><NavLink to='dashboard/addpost'>Add Post</NavLink></li>
                        <li className="font-medium text-base"><NavLink to='dashboard/mypost'>My Post</NavLink></li>
                        <hr className="my-10"/>
                        <li className="font-medium text-base"><NavLink to='/'>Home</NavLink></li>
                    </ul>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;