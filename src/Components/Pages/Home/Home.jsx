import { useState } from "react";
import AllTagPost from "./AllTagPost";

import AnnouncementSection from "../Dashboard/MakeAnnouncement/AnnouncementSection";
import Pagination from "../Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
    const [search, setSearch] = useState('');

    const { data, refetch } = useQuery({
        queryKey: ['GET'],
        queryFn: () => {
            return fetch(`http://localhost:5000/getaddpost?search=${search}`)
                .then(res => res.json())
                .then(data => {
                    return data;
                })
        }
    });


    const handleButton = () => {
        refetch();
    }



    return (
        <div>
            <div className="bg-blue-500 text-white py-10 bannerBg">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4 text-center">Welcome to MyInbox</h1>
                    <p className="text-lg mb-8 text-center">Stay connected with your friends and family through our seamless chat experience.</p>
                    <div className="flex justify-center">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            className="w-full text-black max-w-md px-4 py-2 rounded-l-md border-none focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        <button onClick={handleButton} className="bg-blue-700 px-4 py-2 rounded-r-md hover:bg-blue-800 focus:outline-none">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-white shadow-md rounded-lg p-6 mb-4 text-center">
                    <p className="text-gray-700"><span className="font-bold">Here is all tags for search : </span> Traveling,Bloging,Entertainment</p>
                </div>
            </div>
            <AnnouncementSection></AnnouncementSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-12 min-h-screen allPostBg mt-4">
                {
                    data?.map(item => <AllTagPost key={item._id} item={item}></AllTagPost>)
                }
            </div>
            <div className="mt-5">
                <Pagination></Pagination>
            </div>
        </div>

    );
};

export default Home;