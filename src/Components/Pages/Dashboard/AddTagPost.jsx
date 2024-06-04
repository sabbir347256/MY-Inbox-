import { useContext } from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { AuthProvider } from "../../../Authprovider/Authcontext";

const AddTagPost = () => {

    const {user} = useContext(AuthProvider);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const title = form.title.value;
        const postTitle = form.postTitle.value;
        const descrip = form.descrip.value;
        const imageurl = user ? user?.photoURL : form.imageurl.value ;
        const inputField = form.inputField.value;
        const postTime = form.postTime.value;
        const downbote = form.downbote.value;
        const upvote = form.upvote.value;
        const user1 = { title, descrip, imageurl,downbote,upvote,postTitle,postTime, inputField, email };
        console.log(user1)
        fetch(`http://localhost:5000/addpost`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user1)
        })
            .then(res => res.json())
            .then(data => {

            })


    }

    return (
        <div className=' min-h-screen raleway bg-gray-100'>
            <form onSubmit={handleSubmit} className="top-10 md:top-10 lg:top-0 p-10 lg:p-16 lg:pl-20 relative">
                <div className="flex flex-col md:flex-row lg:flex-row border-2 w-[300px] md:w-[690px] lg:w-[1000px] rounded-lg bg-white justify-center  pb-32  lg:pb-28 pt-10 lg:pt-28">
                    <div className="mr-10  mt-3">
                        <h2 className="text-center">Author Image</h2>
                        <input type="text" name='imageurl' className=" relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Image Url" required />
                        <br />
                        <h2 className="text-center">Author Name</h2>
                        <input type="text" name='title' className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Title here" required />
                        <br />
                        <h2 className="text-center">Author Email</h2>
                        <input type="email" name='email' className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Title here" required />
                        <br />
                        <h2 className="text-center">Post Title</h2>
                        <input type="text" className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" name='postTitle' placeholder="Post title" required />
                        <h2 className="text-center">Post Time</h2>
                        <input type="time" className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" name='postTime' placeholder="Post title" required />
                    </div>
                    <div>
                        <h2 className="text-center">Post Description</h2>
                        <input type="text" name='descrip' className='p-10 my-3  relative left-5 w-64 lg:w-96 border-2 border-black rounded-md' placeholder="Description" required />
                        <br />
                        <h2 className="text-center">Select the tag</h2>
                        <select className="p-2 border-2 relative left-5 w-64 lg:w-96 border-black rounded-md" name="inputField" id="" required>
                            <option value="Traveling">Traveling</option>
                            <option value="Bloging">Bloging</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                        <div className="flex items-center justify-center">
                            <h2>UpVote(please do not filled up)</h2>
                            <BiSolidUpvote></BiSolidUpvote>
                        </div>
                        <input type="text" name='upvote' defaultValue={0} className=' my-3  relative left-5 w-64 lg:w-96 border-2 border-black rounded-md' placeholder="Description" required />
                        <div className="flex items-center justify-center">
                            <h2>DownVote(please do not filled up)</h2>
                            <BiSolidDownvote></BiSolidDownvote>
                        </div>
                        <input type="text" name='downbote' defaultValue={0} className='relative left-5 w-64 lg:w-96 border-2 border-black rounded-md' placeholder="Description" required />
                        <br />
                        {/* <div className="mt-3">
                            <DatePicker type='text' name="calender" className="p-2 relative left-5 w-64 lg:w-96 border-2 border-black rounded-md" required selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div> */}
                    </div>
                </div>
                <div className="mt-3 text-center relative bottom-20 lg:right-16">
                    <button className="btn btn-outline w-64 lg:w-96 font-bold bg-[#a8df43]">Add Post</button>
                </div>
            </form>
        </div>
    );
};

export default AddTagPost;