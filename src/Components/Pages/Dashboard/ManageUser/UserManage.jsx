import { useLoaderData } from "react-router-dom";
import UserDataRow from "./UserDataRow ";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const UserManage = () => {
    const {count} = useLoaderData();
    const itemPerPage = 10;
    const numberOfPage = Math.ceil(count / itemPerPage);
    const [currentPage,setCurrentPage] = useState(0); 

    const pages = [...Array(numberOfPage).keys()];

    const { data, isLoading,refetch } = useQuery({
        queryKey: ['GET',currentPage,itemPerPage],
        queryFn: () => {
            return fetch(`https://assignment-12-server-site-pi.vercel.app/users?page=${currentPage}&size=${itemPerPage}`)
                .then(res => res.json())
                .then(data => {
                    return data
                })
        }
    });
    refetch();
    // const { data:userCount } = useQuery({
    //     queryKey: ['GET'],
    //     queryFn: () => {
    //         return fetch(`https://assignment-12-server-site-pi.vercel.app/users?page=${currentPage}&size=${itemPerPage}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 return data
    //             })
    //     }
    // });

    const handlePrevPage = () =>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () =>{
        if(currentPage < pages.length){
            setCurrentPage(currentPage + 1);
        }
    }


    if (isLoading) {
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }

    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                                    >
                                        Status
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    data?.map(user => <UserDataRow key={user._id} user={user}></UserDataRow>)
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="pagination text-center">
                        <button onClick={handlePrevPage}>Prev</button>
                       {
                        pages.map((page,index) => <button className={currentPage === page ? 'selected': undefined }
                            onClick={() => setCurrentPage(page)}
                            key={index}
                        >{page}</button>)
                       }
                       <button onClick={handleNextPage}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManage;