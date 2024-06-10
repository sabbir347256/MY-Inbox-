import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Announcement = () => {
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const announceTitle = form.announceTitle.value;
        const descrip = form.descrip.value;
        const imageurl = form.imageurl.value;
        const user1 = { title, descrip, imageurl, announceTitle };
        // console.log(user1)

         fetch(`http://localhost:5000/announcement`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user1)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "AnnounceMent Successfully added",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(location?.state ? location.state : '/')
                }
            })
    }

    return (
        <div className=' min-h-screen raleway bg-gray-100'>
            <form onSubmit={handleSubmit} className="top-10 md:top-10 lg:top-0 p-10 lg:p-16 lg:pl-20  relative">
                <div className="flex flex-col md:flex-row lg:flex-row border-2 w-[300px] md:w-[690px] lg:w-[1000px] rounded-lg bg-white justify-center pb-32 lg:pb-28 pt-10 lg:pt-28">
                    <div className="mr-10  mt-3">
                        <h2 className="text-center">Author Image</h2>
                        <input type="text" name='imageurl' className=" relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Image Url" required />
                        <br />
                        <h2 className="text-center">Author Name</h2>
                        <input type="text" name='title' className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Title here" required />
                        <br />
                        <h2 className="text-center">Title</h2>
                        <input type="text" name='announceTitle' className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" placeholder="Title here" required />
                        <br />
                        <h2 className="text-center">Description</h2>
                        <input type="text" className="relative left-5 w-64 lg:w-96 p-2 border-2 border-black rounded-md" name='descrip' placeholder="Post title" required />
                    </div>
                </div>
                <div className="mt-3 text-center relative bottom-20 ">
                    <button className="btn btn-outline w-64 lg:w-96 font-bold bg-[#a8df43]">Add Announcement</button>
                </div>
            </form>
        </div>
    );
};

export default Announcement;