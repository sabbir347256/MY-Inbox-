import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import Setmypost from "./Setmypost";

const Mypost = () => {
    const { user } = useContext(AuthProvider);
    const [mypost, setMypost] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/getaddpost?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                const filterData = data?.filter(singleData => singleData?.email == user?.email)
                setMypost(filterData);
            })
    }, [user?.email]);
    return (
        <div className="min-h-screen">
            {
                mypost.map(data => <Setmypost key={data._id} data={data}></Setmypost>)
            }
        </div>
    );
};

export default Mypost;