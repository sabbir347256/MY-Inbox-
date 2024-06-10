import { useQuery } from "@tanstack/react-query";
import AllreportBody from "./AllreportBody";

const Allreport = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['GET'],
        queryFn: () => {
            return fetch('https://assignment-12-server-site-pi.vercel.app/showallreport')
                .then(res => res.json())
                .then(data => {
                    return data
                })
        }
    });
    if(isLoading){
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
        </div>
    );
};

export default Allreport;