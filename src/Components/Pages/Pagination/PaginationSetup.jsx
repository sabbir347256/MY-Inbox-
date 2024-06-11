import Pagination from "./Pagination";

const PaginationSetup = () => {
    const users = [
        { name: "User 1" },
        { name: "User 2" },
        { name: "User 3" },
        { name: "User 4" },
        { name: "User 5" },
        { name: "User 6" },
        { name: "User 7" },
        { name: "User 8" },
        { name: "User 9" },
        { name: "User 10" },
        { name: "User 11" },
        { name: "User 12" },
        // Add more users as needed
    ];
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <Pagination users={users} usersPerPage={10} />
        </div>
    );
};

export default PaginationSetup;