import { useLoaderData, useParams } from "react-router-dom";

const ShowDetails = () => {
    // const { user, theme } = useContext(AuthProvider)
    const detailsData = useLoaderData();
    // const navigate = useNavigate();
    const { id } = useParams();
    const details = detailsData.find(data => data._id == id);
    const { imageurl, title, descrip, inputField, email } = details;
    return (
        <div className="bg-gray-100 min-h-screen libre-font">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center text-4xl font-extrabold pt-10">Post Details Information</h2>
                <div className="grid  md:grid-cols-5 lg:grid-cols-5 pt-16 px-5 ml-8">
                    <div className="col-span-3 pr-12 relative top-52 md:top-0 lg:top-0 left-2 md:left-0 lg:left-0">
                        <h2><span className="text-red-600 font-bold">Assignment Name :</span> <br /> <span className="font-extrabold text-4xl"> {title}</span></h2>
                        <h2 className="my-5"><span className="text-red-600">Description : <br /> </span> <span className="font-bold">{descrip}</span></h2>
                        <h2 className="my-5"><span className="text-red-600">Difficulty Level : </span><span className="font-bold">{inputField}</span></h2>
                        <h2 className="my-5"><span className="text-red-600">User Email : </span><span className="font-bold">{email}</span></h2>
                        <button className="btn bg-[#F97300] btn-success mr-4 text-white mb-16 md:mb-0 lg:mb-0 relative left-10 md:left-0 lg:left-0" onClick={() => document.getElementById('my_modal_1').showModal()}>Comment</button>
                        <button className="btn btn-primary bg-[#F97300] text-white mb-16 md:mb-0 lg:mb-0 relative left-10 md:left-0 lg:left-0">Share</button>
                        
                    </div>
                    <div className="col-span-2 relative bottom-[700px] md:bottom-0 lg:bottom-0 left-5 md:left-0 lg:left-0">
                        <img className="border-2 border-black p-5 rounded-lg" src={imageurl} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;