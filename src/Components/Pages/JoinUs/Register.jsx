import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import Swal from "sweetalert2";

const Register = () => {
    const { createUser } = useContext(AuthProvider);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const email = data.email;
        const pass = data.pass;
        const photourl = data.photourl;
        const name = data.name;
        const userInfo = {
            email, photourl, name
        }
        console.log(email, pass)
        if (pass.length < 6) {
            setError('Please provide at least 6 character password');
            return;
        } else if (!/[A-Z]/.test(pass)) {
            setError('Please provide at least one Uppercase character.');
            return;
        } else if (!/[a-z]/.test(pass)) {
            setError('please provide at least one lowercase character');
            return;
        }

        setError('');



        createUser(email, pass)
            .then(res => {
                setSuccess(
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Register Succesfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                );
                fetch(`http://localhost:5000/registerUser`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(data => {

                    })
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content ">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="name here" className="input input-bordered" />
                            {/* {errors.name && <span className="text-red-400">This field is required</span>} */}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="url" {...register("photourl", { required: true })} placeholder="name here" className="input input-bordered" />
                            {/* {errors.name && <span className="text-red-400">This field is required</span>} */}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.name && <span className="text-red-400">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("pass", { required: true })} name="pass" placeholder="password" className="input input-bordered" />
                            {errors.name && <span className="text-red-400">This field is required</span>}
                            {
                                error && <p className="text-red-600 font-semibold">{error}</p>
                            }
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className="mx-4 mb-4">All Ready have an account . please <NavLink to='/joinus' className='text-blue-600 font-bold'>Login</NavLink></p>
                </div>
                {
                    success && <p>{success}</p>
                }
            </div>
        </div>
    );
};

export default Register;