import { useEffect, useState } from "react";
import AllTagPost from "./AllTagPost";
import Banner from "./Banner";
import { data } from "autoprefixer";

const Home = () => {
    const [addpost, setAddPost] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getaddpost')
            .then(res => res.json())
            .then(data => setAddPost(data))
    }, [])
console.log(addpost)

    return (
        <div>
            <Banner></Banner>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-12 min-h-screen allPostBg mt-4">
                {
                    addpost.map(item => <AllTagPost key={item._id} item={item}></AllTagPost>)
                }
            </div>
        </div>

    );
};

export default Home;