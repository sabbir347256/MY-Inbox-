import { useContext, useEffect, useState } from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import SetComment from "./SetComment";
import { FacebookShareButton } from "react-share";

const ShowDetails = () => {
    const { user } = useContext(AuthProvider)
    const detailsData = useLoaderData();
    // const navigate = useNavigate();
    const [allComment, setAllComment] = useState([]);
    const [comment1, setComment] = useState('')
    const { id } = useParams();
    console.log(id)
    const details = detailsData.find(data => data._id == id);
    const { imageurl, title, descrip, inputField, email } = details;



    const handleCommentChange = e => {
        setComment(e.target.value)
    }

    const handleComment = e => {
        e.preventDefault();
        const comment = e.target.comment.value;
        setComment('')
        const userComment = {
            postId: id,
            comment: comment,
            name: user?.displayName,
            email: user?.email
        }
        fetch(`https://assignment-12-server-site-pi.vercel.app/comment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    useEffect(() => {
        fetch('https://assignment-12-server-site-pi.vercel.app/comment')
            .then(res => res.json())
            .then(data => setAllComment(data))
    }, [])

    const handlevote = e => {
        e.preventDefault();
        const upvote = document.getElementById('upvote');
        const count = upvote + 1;
        console.log(count)
    }



    return (
        <div className="bg-gray-100 min-h-screen libre-font pb-5">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center text-4xl font-extrabold pt-10">Post Details Information</h2>
                <div className="grid md:grid-cols-5 lg:grid-cols-5 pt-16 px-5 ml-8">
                    <div className="col-span-3 pr-12 relative top-52 md:top-0 lg:top-0 left-2 md:left-0 lg:left-0">
                        <h2><span className="text-red-600 font-bold">Assignment Name :</span> <br /> <span className="font-extrabold text-4xl"> {title}</span></h2>
                        <h2 className="my-5"><span className="text-red-600">Description : <br /> </span> <span className="font-bold text-black">{descrip}</span></h2>
                        <h2 className="my-5"><span className="text-red-600">Difficulty Level : </span><span className="font-bold text-black">{inputField}</span></h2>
                        <h2 className="my-5"><span className="text-red-600">User Email : </span><span className="font-bold text-black">{email}</span></h2>
                        <h2 id="upvote">0</h2>
                        <div className="flex mb-3">
                            <div className="">
                                <button onClick={handlevote} className="flex items-center btn btn-primary text-white mr-2 "><BiSolidUpvote></BiSolidUpvote>UpVote</button>

                            </div>
                            <div className="">
                                <button className="flex items-center btn btn-primary text-white "><BiSolidDownvote></BiSolidDownvote>DownVote</button>

                            </div>
                        </div>
                        <form onSubmit={handleComment}>
                            <input onChange={handleCommentChange} value={comment1} className="border-2 border-red-300 rounded-xl p-4" type="text" name="comment" id="" />
                            <br />
                            <input className="btn my-4 bg-[#F97300] btn-success text-white" type="submit" value="Comment" /> <br />
                        </form>
                        {/* <button className="btn bg-[#F97300] btn-success mr-4 text-white mb-16 md:mb-0 lg:mb-0 relative left-10 md:left-0 lg:left-0" onClick={() => document.getElementById('my_modal_1').showModal()}>Comment</button> */}
                        <button className="btn btn-primary bg-[#F97300] text-white mb-16 md:mb-0 lg:mb-0 relative  md:left-0 lg:left-0"><FacebookShareButton
                            url="facebook.com"
                        >
                            Share to Facebook
                        </FacebookShareButton>
                        </button>

                    </div>
                    <div className=" col-span-2 relative bottom-[700px] md:bottom-0 lg:bottom-0 left-5 md:left-0 lg:left-0">
                        <img className="border-2 border-black p-5 rounded-lg" src={imageurl} alt="" />
                        <div className="border-2 mt-[16rem]  md:mt-4 relative top-[33rem] md:top-0 p-4">
                            <h2 className="text-center text-2xl font-bold mb-5">Comment Section</h2>
                            <div className="px-2 ">
                                {
                                    allComment.slice(0, 2).map(c => <SetComment key={c._id} c={c} allComment={allComment} ></SetComment>)
                                }
                                {
                                    allComment.length > 2 && <button className="btn btn-primary my-3">Show All Comment</button>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShowDetails;