import { useContext } from "react";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import Setmypost from "./Setmypost";
import { useQuery } from "@tanstack/react-query";

const Mypost = () => {
    const { user ,loading} = useContext(AuthProvider);


    const { data : mypost = [],isLoading,refetch} = useQuery({
        queryKey: ['MyPost', user?.email],
        enabled : !loading || !!user?.email ,
        queryFn: () => {
           return fetch(`https://assignment-12-server-site-pi.vercel.app/getaddpost/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    return data;
                })
        }
    });

    if(isLoading || loading){
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }

    return (
        <div className="min-h-screen">
            {
                mypost?.map((data,index) => <Setmypost key={index } data={data} refetch={refetch}></Setmypost>)
            }
        </div>
    );
};

export default Mypost;