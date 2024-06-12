import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import Swal from "sweetalert2";
import HostModal from "../HostRequestModal/HostRequestModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import useRole from './../Hooks/useRole';
import { useQuery } from "@tanstack/react-query";
import logo from '../../../image/logo.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ['Notification'],
        queryFn: () => {
            return fetch('https://assignment-12-server-site-pi.vercel.app/announcement')
                .then(res => res.json())
                .then(data => {
                    return data
                })
        }
    });


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const { logOut, user } = useContext(AuthProvider);
    const navigate = useNavigate();
    const [role] = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const modalHandle = () => {
        console.log('I want to be a host')
        try {
            const currentUser2 = {
                email: user?.email,
                role: 'guest',
                status: 'Requested'
            }

            fetch(`https://assignment-12-server-site-pi.vercel.app/user`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser2)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.modifiedCount > 0 && data.upsertedCount > 0) {
                        toast.success('Succes ! Please wait for admin confirmation');
                    }
                    else {
                        toast.success('Please ! Wait for admin approval');
                    }
                })
        }
        catch (err) {
            console.log(err);
        } finally {
            closeModal();
        }

    }


    const navlinks = <>

        <li className="relative group">
            <NavLink to='/' className="text-black ml-4 md:ml-0 lg:ml-0 text-lg transition duration-300 ease-in-out transform group-hover:text-red-500">
                Home
                <span className="block h-0.5 bg-white group-hover:bg-red-500 transition-all duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
            </NavLink>
        </li>
        <li className="relative group">
            <NavLink to='/membership' className="text-black text-lg transition duration-300 ease-in-out transform group-hover:text-red-500">
                MemberShip
                <span className="block h-0.5 bg-white group-hover:bg-red-500 transition-all duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
            </NavLink>
        </li>
        {
            !user && <li className="relative group">
                <NavLink to='/joinus' className="text-black text-lg transition duration-300 ease-in-out transform group-hover:text-red-500">
                    Join Us
                    <span className="block h-0.5 bg-white group-hover:bg-red-500 transition-all duration-300 ease-in-out scale-x-0 group-hover:scale-x-100"></span>
                </NavLink>
            </li>
        }
    </>


    const handleSignOut = () => {
        logOut()
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Log Out Successfully",
            showConfirmButton: false,
            timer: 1500
        })
        navigate(location?.state ? location.state : '/')
    }
    return (
        <div>
            <nav className="bg-gray-200 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img className="rounded-full w-8" src={logo} alt="" />
                        <a href="/" className="text-black text-xl font-bold">MY-INBOX</a>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                    <ul className={`md:flex space-x-4 items-center ${isOpen ? 'block' : 'hidden'} md:block`}>
                        {navlinks}
                        <div className="hidden md:inline-block">
                            {/* {
                        !user &&  */}
                            <button
                                disabled={!user || !(role === 'guest')}
                                onClick={() => setIsModalOpen(true)}
                                className="btn disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100"
                            >
                                Admin Request
                            </button>
                            {/* } */}
                        </div>
                        <HostModal isOpen={isModalOpen} closeModal={closeModal} modalHandle={modalHandle}></HostModal>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <button className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    <span className="badge badge-xs badge-primary indicator-item">{data?.length}</span>
                                </div>
                            </button>
                            <div className="relative group z-10">
                                {
                                    user ? <img className=" rounded-full w-12 cursor-pointer" src={user?.photoURL} alt="" /> : <FaUserCircle className="text-black text-2xl cursor-pointer" />
                                }
                                <FaUserCircle className={!user && 'text-black text-2xl cursor-pointer hidden'} />
                                <div className="absolute right-0 mt-1 hidden group-hover:block bg-gray-300 p-2 rounded shadow-lg">
                                    <div className="block px-4 py-2 font-semibold text-black">{user ? <p>{user?.displayName}</p> : <p>Username</p>}</div>
                                    <a href="/dashboard" className="block px-4 py-2 text-black hover:bg-gray-400 rounded">Dashboard</a>
                                    {
                                        user && <button onClick={handleSignOut} className="block px-4 py-2 text-black hover:bg-gray-400 rounded">Logout</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </ul>

                </div>
            </nav>
            <ToastContainer />
        </div>
        // <div className="navbar bg-base-200">
        //     <div className="navbar-start">
        //         <div className="dropdown">
        //             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        //             </div>
        //             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        //                 {navlinks}
        //             </ul>
        //         </div>
        //         <a className="btn btn-ghost text-xl bg-gray-200">MY INBOX</a>
        //     </div>
        //     <div className="navbar-center hidden lg:flex">
        //         <ul className="menu menu-horizontal px-1">
        //             {navlinks}
        //         </ul>
        //     </div>
        //     <div className="navbar-end">
        //         <button className="btn btn-ghost btn-circle">
        //             <div className="indicator">
        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        //                 <span className="badge badge-xs badge-primary indicator-item"></span>
        //             </div>
        //         </button>
        //         <div className="hidden md:inline-block">
        //             {/* {
        //                 !user &&  */}
        //             <button
        //                 disabled={!user}
        //                 onClick={() => setIsModalOpen(true)}
        //                 className="btn disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100"
        //             >
        //                 Host Your Home
        //             </button>
        //             {/* } */}
        //         </div>
        //         <HostModal isOpen={isModalOpen} closeModal={closeModal} modalHandle={modalHandle}></HostModal>
        //         <div className="dropdown dropdown-end">
        //             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        //                 <div className="w-10 rounded-full">
        //                     <img alt="Tailwind CSS Navbar component" src={user ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
        //                 </div>
        //             </div>
        //             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        //                 <li className="uppercase">{user ? user.displayName : 'User Name'}</li>
        //                 <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        //                 <li><button onClick={handleSignOut}>Log Out</button></li>
        //             </ul>
        //         </div>
        //     </div>
        //     <ToastContainer />
        // </div>
    );
};

export default Navbar;