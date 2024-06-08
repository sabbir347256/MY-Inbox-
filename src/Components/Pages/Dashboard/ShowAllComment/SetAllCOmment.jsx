import { useState } from "react";
import { NavLink } from "react-router-dom";

const SetAllCOmment = ({ c }) => {
    const { name, email, comment } = c;
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

    return (
        <div className='mt-5 overflow-x-auto'>
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
                                    <div className="font-bold">{name}</div>
                                </div>
                            </div>
                        </td>
                        <td className='font-bold'>
                            {email}
                        </td>
                        <td className='font-bold'>
                            {comment}
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

export default SetAllCOmment;