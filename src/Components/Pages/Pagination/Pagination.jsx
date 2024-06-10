// src/components/Pagination.js

import React, { useState, useEffect } from "react";

const Pagination = ({ users, usersPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    id={i}
                    onClick={handleClick}
                    className={`cursor-pointer px-2 py-1 ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
                        } rounded mx-1`}
                >
                    {i}
                </li>
            );
        }
        return pageNumbers;
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentUsers.map((user, index) => (
                    <li key={index} className="border p-4 rounded">
                        {user.name}
                    </li>
                ))}
            </ul>
            <ul className="flex justify-center mt-4">
                {renderPageNumbers()}
            </ul>
        </div>
    );
};

export default Pagination;
