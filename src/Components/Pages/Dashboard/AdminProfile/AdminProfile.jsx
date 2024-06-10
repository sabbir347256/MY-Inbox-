import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../../../Authprovider/Authcontext";
import { FaComment, FaPen, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie } from "recharts";

const AdminProfile = () => {
    const { user } = useContext(AuthProvider);
    const [comment, setComment] = useState([])
    const [report, setreport] = useState([])

    
    const { data, isloading } = useQuery({
        queryKey: ['role'],
        queryFn: async () =>
            fetch(`http://localhost:5000/getaddpost`)
                .then(res => res.json())
                .then(data => {
                    return data
                })
    })

    useEffect(() => {
        fetch(`http://localhost:5000/comment`)
            .then(res => res.json())
            .then(data => {
                setComment(data)
            })
    }, [])


    useEffect(() => {
        fetch(`http://localhost:5000/showallreport`)
            .then(res => res.json())
            .then(data => {
                setreport(data)
            })
    }, [])

    const data1 = [
        { name: 'Post', value: data?.length },
        { name: 'Comment', value: comment?.length },
        { name: 'Report', value: report?.length },
    ];

    if (isloading) {
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center">
                            <FaPen className="text-blue-500 text-3xl mr-4" />
                            <div>
                                <h2 className="text-xl font-bold text-blue-500 mb-2">Number of Posts</h2>
                                <p className="text-2xl text-blue-700">{data?.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center">
                            <FaComment className="text-green-500 text-3xl mr-4" />
                            <div>
                                <h2 className="text-xl font-bold text-green-500 mb-2">Number of Comments</h2>
                                <p className="text-2xl text-green-700">{comment?.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center">
                            <FaUsers className="text-red-500 text-3xl mr-4" />
                            <div>
                                <h2 className="text-xl font-bold text-red-500 mb-2">Number of Users</h2>
                                <p className="text-2xl text-red-700">{report?.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-32'>

                <div className='bg-white shadow-lg rounded-2xl w-3/5'>
                    <img
                        alt='profile'
                        src='https://wallpapercave.com/wp/wp10784415.jpg'
                        className='w-full mb-4 rounded-t-lg h-36'
                    />
                    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                        <a href='#' className='relative block'>
                            <img
                                alt='profile'
                                src={user?.photoURL}
                                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                            />
                        </a>

                        <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
                            Admin
                        </p>
                        <div className='w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                                <p className='flex flex-col'>
                                    Name
                                    <span className='font-bold text-black '>
                                        {user?.displayName}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    Email
                                    <span className='font-bold text-black '>{user?.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className=" text-3xl font-bold mt-8 flex justify-center">Presenting By PieChart</h2>
            </div>
            <div className="text-center flex justify-center">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data1}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                </PieChart>
            </div>
        </div>


    );
};

export default AdminProfile;