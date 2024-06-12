import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../../../Authprovider/Authcontext";
import { FaComment, FaPen, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie } from "recharts";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
    const { user } = useContext(AuthProvider);
    const [comment, setComment] = useState([])
    const [report, setreport] = useState([])
    const navigate = useNavigate();



    const { data, isloading } = useQuery({
        queryKey: ['role'],
        queryFn: async () =>
            fetch(`https://assignment-12-server-site-pi.vercel.app/getaddpost`)
                .then(res => res.json())
                .then(data => {
                    return data
                })
    })

    useEffect(() => {
        fetch(`https://assignment-12-server-site-pi.vercel.app/comment`)
            .then(res => res.json())
            .then(data => {
                setComment(data)
            })
    }, [])


    useEffect(() => {
        fetch(`https://assignment-12-server-site-pi.vercel.app/showallreport`)
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

    const handleSubmit = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const title = form.title.value;
        const postTitle = form.postTitle.value;
        const descrip = form.descrip.value;
        const imageurl = form.imageurl.value;
        const inputField = form.inputField.value;
        const postTime = form.postTime.value;
        const downbote = form.downbote.value;
        const upvote = form.upvote.value;
        const user1 = { title, descrip, imageurl, downbote, upvote, postTitle, postTime, inputField, email };

        fetch(`http://localhost:5000/addpost`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user1)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Successfully post.",
                        icon: "success"
                    });
                }
                navigate(location?.state ? location.state : '/')
            })
    }

    if (isloading) {
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
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
            <div className=' min-h-screen raleway bg-gray-100'>     
                <form onSubmit={handleSubmit} className="top-10 md:top-10 lg:top-0 p-10 md:p-0 lg:p-16 pl-0 md:pl-0 lg:pl-20 relative">
                    <div className="flex flex-col md:flex-row lg:flex-row border-2 w-[300px] md:w-[500px] lg:w-[1000px] rounded-lg bg-white justify-center  pb-32  lg:pb-28 pt-10 lg:pt-28">
                        <div className="mr-10  mt-3">
                            <h2 className="text-center">Author Image</h2>
                            <input type="text" name='imageurl' className=" relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Image Url" required />
                            <br />
                            <h2 className="text-center">Author Name</h2>
                            <input type="text" name='title' className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Title here" required />
                            <br />
                            <h2 className="text-center">Author Email</h2>
                            <input type="email" name='email' className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Title here" required />
                            <br />
                            <h2 className="text-center">Post Title</h2>
                            <input type="text" className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" name='postTitle' placeholder="Post title" required />
                            <h2 className="text-center">Post Time</h2>
                            <input type="time" className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" name='postTime' placeholder="Post title" required />
                        </div>
                        <div>
                            <h2 className="text-center">Post Description</h2>
                            <input type="text" name='descrip' className='p-10 my-3  relative left-5 w-64 lg:w-96 border-2 border-black rounded-md' placeholder="Description" required />
                            <br />
                            <h2 className="text-center">Select the tag</h2>
                            <select className="p-2 border-2 relative left-5 w-64 lg:w-96 border-black rounded-md" name="inputField" id="" required>
                                <option value="Traveling">Traveling</option>
                                <option value="Bloging">Bloging</option>
                                <option value="Entertainment">Entertainment</option>
                            </select>
                            <div className="flex items-center justify-center">
                                <h2>UpVote(please do not filled up)</h2>
                                <BiSolidUpvote></BiSolidUpvote>
                            </div>
                            <input type="text" name='upvote' defaultValue={0} className=' my-3  relative left-5 w-64 lg:w-96 border-2 border-black rounded-md' placeholder="Description" required />
                            <div className="flex items-center justify-center">
                                <h2>DownVote(please do not filled up)</h2>
                                <BiSolidDownvote></BiSolidDownvote>
                            </div>
                            <input type="text" name='downbote' defaultValue={0} className='relative left-5 w-64 lg:w-96 border-2 border-black rounded-md' placeholder="Description" required />
                            <br />
                            {/* <div className="mt-3">
                            <DatePicker type='text' name="calender" className="p-2 relative left-5 w-64 lg:w-96 border-2 border-black rounded-md" required selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div> */}
                        </div>
                    </div>
                    <div className="mt-3 text-center relative bottom-20 lg:right-16">
                        <button className="btn btn-outline w-64 lg:w-96 font-bold bg-[#a8df43]">Add Post</button>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default AdminProfile;