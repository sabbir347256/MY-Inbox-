import { useContext } from "react";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import Setmypost from "./Setmypost";
import { useQuery } from "@tanstack/react-query";

const Mypost = () => {
    const { user } = useContext(AuthProvider);


    const { data,isLoading,refetch} = useQuery({
        queryKey: ['post', user?.email],
        queryFn: () => {
           return fetch(`http://localhost:5000/getaddpost?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    const filterData = data?.filter(singleData => singleData?.email == user?.email)
                    return filterData;
                })
        }
    });

    if(isLoading){
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }

    return (
        <div className="min-h-screen">
            {
                data?.map(data => <Setmypost key={data._id} data={data} refetch={refetch}></Setmypost>)
            }
        </div>
    );
};

export default Mypost;