import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import Swal from "sweetalert2";
import HostModal from "../HostRequestModal/HostRequestModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const { logOut, user } = useContext(AuthProvider);
    const navigate = useNavigate();
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

            fetch(`http://localhost:5000/user`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser2)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.modifiedCount > 0 && data.upsertedCount > 0 ){
                        toast.success('Succes ! Please wait for admin confirmation');
                    }
                    else{
                        toast.success('Please ! Wait for admin approval');
                    }
                })
        }
        catch(err) {
            console.log(err);
        }finally{
            closeModal();
        }

    }


    const navlinks = <>

        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/membership'>Membership</NavLink></li>
        <li><NavLink to='/joinus'>Join Us </NavLink></li>
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
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl bg-gray-200">MY INBOX</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                <div className="hidden md:inline-block">
                    {/* {
                        !user &&  */}
                    <button
                        disabled={!user}
                        onClick={() => setIsModalOpen(true)}
                        className="btn disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100"
                    >
                        Host Your Home
                    </button>
                    {/* } */}
                </div>
                <HostModal isOpen={isModalOpen} closeModal={closeModal} modalHandle={modalHandle}></HostModal>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="uppercase">{user ? user.displayName : 'User Name'}</li>
                        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                        <li><button onClick={handleSignOut}>Log Out</button></li>
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Navbar;