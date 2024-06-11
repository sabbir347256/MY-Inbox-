import { useQuery } from "@tanstack/react-query";
import AllreportBody from "./AllreportBody";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Allreport = () => {
    const{count} = useLoaderData();
    const itemPerPage = 10;
    const numberOfPage = Math.ceil(count / itemPerPage);
    const [currentPage, setCurrentPage] = useState(0);
    const pages = [...Array(numberOfPage).keys()];

    const { data, isLoading } = useQuery({
        queryKey: ['GET',currentPage,itemPerPage],
        queryFn: () => {
            return fetch(`https://assignment-12-server-site-pi.vercel.app/showallreport?page=${currentPage}&size=${itemPerPage}`)
                .then(res => res.json())
                .then(data => {
                    return data
                })
        }
    });


    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    }


    if (isLoading) {
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Comment</th>
                        <th>Report</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(user => <AllreportBody key={user._id} user={user}></AllreportBody>)
                    }
                </tbody>
            </table>
            <div className="pagination text-center mt-3">
                <button onClick={handlePrevPage}>Prev</button>
                {
                    pages.map((page, index) => <button className={currentPage === page ? 'selected' : undefined}
                        onClick={() => setCurrentPage(page)}
                        key={index}
                    >{page}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default Allreport;