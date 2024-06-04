import { NavLink } from "react-router-dom";

const AllTagPost = ({ item }) => {
    const {_id,inputField,postTime, title, descrip, imageurl } = item;
    return ( 
        <div className="card w-96 bg-base-300 shadow-xl text-center pt-10 mt-32 mx-10">
            <figure><img className="rounded-full" src={imageurl} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title flex justify-center">
                    {title}
                </h2>
                <p>{descrip.slice(0,110)}....</p>
                <div className="card-actions justify-center">
                    <div className="badge badge-outline px-8 py-3">{postTime}</div>
                    <div className="badge badge-outline px-8 py-3">{inputField}</div>
                </div>
                <NavLink to={`/getaddpost/${_id}`}><button className="btn mt-5 w-full  bg-[#97BE5A] ">Show Details</button></NavLink>
                
            </div>
        </div>
    );
};

export default AllTagPost;