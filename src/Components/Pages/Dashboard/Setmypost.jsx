import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
const Setmypost = ({ data }) => {
    const { postTitle} = data;
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
                            <NavLink to='/comment'><button className="btn btn-ghost bg-yellow-300">Comment</button></NavLink>
                        </th>
                        <th>
                            <NavLink ><button className="btn btn-ghost bg-red-600 text-white">Delete</button></NavLink>
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