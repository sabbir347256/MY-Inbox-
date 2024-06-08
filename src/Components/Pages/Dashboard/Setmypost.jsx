import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import Swal from "sweetalert2";
const Setmypost = ({ data }) => {
    const { _id, postTitle } = data;

    const handleDelete = (id) => {
        // if (email !== user.email) return alert('not allowed');

        // const id = { _id }
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/deletePost/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        })
    }

    return (
        <div className='mt-5 overflow-x-auto'>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Post Title</th>
                        <th>Number Of Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td>
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className="font-bold">{postTitle}</div>
                                </div>
                            </div>
                        </td>
                        <td className='font-bold'>
                            number
                        </td>
                        <th>
                            <NavLink to={`/comment/${_id}`}><button className="btn btn-ghost bg-yellow-300">Comment</button></NavLink>
                        </th>
                        <th>
                            <NavLink ><button onClick={() => handleDelete(_id)} className="btn btn-ghost bg-red-600 text-white">Delete</button></NavLink>
                        </th>
                    </tr>
                </tbody>
                {/* foot */}

            </table>
        </div>
    );
};

Setmypost.propTypes = {
    data: PropTypes.object,
}

export default Setmypost;