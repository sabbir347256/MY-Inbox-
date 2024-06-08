import { useState } from "react";
import { NavLink, useLoaderData, useParams } from "react-router-dom";

const ShowAllComment = () => {
    const [selectedFeedback, setSelectedFeedback] = useState('');
    const [isReportButtonDisabled, setIsReportButtonDisabled] = useState(true);

    const handleFeedbackChange = (event) => {
        const feedback = event.target.value;
        setSelectedFeedback(feedback);
        setIsReportButtonDisabled(feedback === '');
    };


    const handleReportClick = () => {
        console.log('Reported for:', selectedFeedback);
        setIsReportButtonDisabled(true);
    };
    const commentsData = useLoaderData();
    // const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const comments = commentsData.find(data => data?.postId == id);
    

    // useEffect(() => {
    //     fetch(`http://localhost:5000/comment/${manageAllComment._id}`)
    //         .then(res => res.json())
    //         .then(data => setAllComment(data))
    // }, [])

    return (
        <div className='mt-5 overflow-x-auto min-h-screen'>
        <table className="table">
            {/* head */}
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Comment</th>
                    <th>FeedBack</th>
                </tr>
            </thead>
            <tbody>
                {/* row 1 */}
                <tr>
                    <td>
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="font-bold">{comments?.name}</div>
                            </div>
                        </div>
                    </td>
                    <td className='font-bold'>
                        {comments?.email}
                    </td>
                    <td className='font-bold'>
                        {comments?.comment}
                    </td>
                    <th>
                        <select onChange={handleFeedbackChange} value={selectedFeedback}>
                            <option value="">Select feedback</option>
                            <option value="Inappropriate content">Inappropriate content</option>
                            <option value="Spam">Spam</option>
                            <option value="Harassment">Harassment</option>
                        </select>
                    </th>
                    <th>
                        <NavLink ><button onClick={handleReportClick}
                            disabled={isReportButtonDisabled} className="btn btn-ghost bg-red-600 text-white">Report</button></NavLink>
                    </th>
                </tr>
            </tbody>
            {/* foot */}

        </table>
    </div>
    );
};

export default ShowAllComment;