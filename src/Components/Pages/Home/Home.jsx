import { useEffect, useState } from "react";
import AllTagPost from "./AllTagPost";

const Home = () => {
    const [addpost,setAddPost] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/getaddpost')
        .then(res => res.json())
        .then(data => setAddPost(data))
    },[])


    return (
        <div>
           {
            addpost.map(item => <AllTagPost key={item._id} item={item}></AllTagPost>)
           }
        </div>
    );
};

export default Home;