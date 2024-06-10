import { useContext} from "react";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import badgeImage from '../../../image/images.jpeg'
import bronzebadge from '../../../image/bronze.png'
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useRole from "../Hooks/useRole";
const UserProfile = () => {
    const { user, loading } = useContext(AuthProvider);
    const [role] = useRole();

    const { data } = useQuery({
        queryKey: ['GET', user?.email],
        queryFn: () => {
            return fetch(`https://assignment-12-server-site-pi.vercel.app/paymentUser/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    return (data);
                })
        }
    });
    if (loading) {
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }
    return (
        <div>
            <div className="flex justify-center">
                {
                    data?.role === 'Gold Badge' ? <h2 className="relative top-20 text-2xl">You are a MemberShip Person</h2> : <h2 className="relative top-20 text-2xl">If You are interested for MemberShip please click Membership button </h2>
                }
            </div>
            <div className='flex justify-center mt-32'>
                <div className='bg-white shadow-lg rounded-2xl w-3/5'>
                    <img
                        alt='profile'
                        src='https://wallpapercave.com/wp/wp10784415.jpg'
                        className='w-full mb-4 rounded-t-lg h-36'
                    />
                    {
                        data?.role === 'Gold Badge' ? <div>
                            <img className="w-12 ml-5" src={badgeImage} alt="" />
                            <h2 className="ml-1 font-bold">Gold Badge</h2>
                        </div> : <div>
                            <img className="w-12 ml-7" src={bronzebadge} alt="" />
                            <h2 className="ml-1 font-bold">Bronze Badge</h2>
                        </div>
                    }
                    {
                        data?.role === 'Gold Badge' ? '' : <div className="flex justify-end relative bottom-16  pr-2">
                            <button className="btn btn-primary"><NavLink to='/membership'>Membership</NavLink></button>
                        </div>
                    }

                    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                        <a href='#' className='relative block'>
                            <img
                                alt='profile'
                                src={user.photoURL}
                                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                            />
                        </a>

                        <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
                            {role}
                        </p>
                        <div className='w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                                <p className='flex flex-col'>
                                    Name
                                    <span className='font-bold text-black '>
                                        {user.displayName}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    Email
                                    <span className='font-bold text-black '>{user.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="flex items-center border border-gray-300 rounded-lg p-4 m-4 max-w-sm">
        //     <img
        //         src={user ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
        //         className="w-20 h-20 rounded-full mr-4"
        //     />
        //     <div className="user-info">
        //         <h2 className="text-xl font-semibold">{user?.displayName}</h2>
        //         <p className="text-gray-600">Email: {user?.email}</p>
        //         <p className="text-gray-600">Role: {role}</p>
        //         {
        //             membership.role === 'Gold Badge' ? <p className="text-gray-600">You are a membership person in this site. And you got this badge : {membership.role} </p> :''

        //         }
        //     </div>
        // </div>
    );
};

export default UserProfile;