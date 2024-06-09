
const AllreportBody = ({ user }) => {
    return (
        <tr className="bg-base-200">
            <td>{user?.email}</td>
            <td>{user?.comment}</td>
            <td>{user?.report}</td>
        </tr>
    );
};

export default AllreportBody;