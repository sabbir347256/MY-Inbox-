import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar";
import useRole from "../Hooks/useRole";
import Footer from "../Home/Footer";
const Dashboard = () => {

    const [role] = useRole();
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col md:flex-row pb-14 md:pb-0">
                <div className="  md:min-h-screen bg-orange-400 ">
                    <ul className="menu w-screen md:w-auto md:p-4">
                        {
                            role === 'admin' && <li className="font-medium text-base "><NavLink className='text-black' to='adminprofile'>Admin Profile</NavLink></li>
                        }
                        {
                            role === 'admin' && <li className="font-medium  "><NavLink className='text-black' to='allReport'>Reported Comments</NavLink></li>
                        }
                        {
                            role === 'admin' && <li className="font-medium  "><NavLink className='text-black' to='announcement'>Make Announcement
                            </NavLink></li>
                        }
                        {
                            role === 'admin' && <li className="font-medium  "><NavLink className='text-black' to='manageuser'>Manage Users</NavLink></li>
                        }
                        
                        {
                            role === 'guest' && <li className="font-medium  "><NavLink className='text-black' to='myprofile'>My Profile</NavLink></li>
                        }
                        {
                            role === 'guest' && <li className="font-medium  "><NavLink className='text-black' to='addpost'>Add Post</NavLink></li>
                        }
                        {
                            role === 'guest' && <li className="font-medium  "><NavLink className='text-black' to='mypost'>My Post</NavLink></li>
                        }
                        
                        
                        <hr className="my-10" />
                        <li className="font-medium text-base"><NavLink className='text-black' to='/'>Home</NavLink></li>
                    </ul>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;