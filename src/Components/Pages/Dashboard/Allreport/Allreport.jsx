import { useQuery } from "@tanstack/react-query";
import AllreportBody from "./AllreportBody";

const Allreport = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['GET'],
        queryFn: () => {
            return fetch('http://localhost:5000/showallreport')
                .then(res => res.json())
                .then(data => {
                    return data
                })
        }
    });
    console.log(data)
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
                        data.map(user => <AllreportBody key={user._id} user={user}></AllreportBody>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Allreport;