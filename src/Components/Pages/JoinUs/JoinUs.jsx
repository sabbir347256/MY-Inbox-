import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleAuthProvider } from "firebase/auth";

const JoinUs = () => {
    const { googleLogin,signIn } = useContext(AuthProvider)
    const provider = new GoogleAuthProvider();
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [emailnotMatch, setemailnotMatch] = useState();


    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onsubmit = data => {
        const email = data.email;
        const pass = data.pass;
        signIn(email, pass)
            .then(res => {
                setSuccess(
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Log In Succesfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                );
                navigate(location?.state ? location.state : '/')

            })
            .catch(error => {
                setemailnotMatch('Email does not match. Please provide a correct email');
            })
    }

    const googleAccount = () => {
        googleLogin(provider)
            .then(result => {
                setSuccess(
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Log In Succesfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                );
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {


            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content ">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onsubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.name && <span className="text-red-400">This field is required</span>}
                            {
                                emailnotMatch && <p className="text-red-500 font-medium">{emailnotMatch}</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("pass", { required: true })} name="pass" placeholder="password" className="input input-bordered" />
                            {errors.name && <span className="text-red-400">This field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Join Us" />
                        </div>
                    </form>
                    <div className=" mt-6 mx-3">
                        <button onClick={googleAccount} className="bg-white border-2 rounded-2xl text-blue-700 font-medium w-80"><span className='relative top-3'>Sign in with Google</span>
                            <FcGoogle className='size-6 relative bottom-3 left-5'></FcGoogle>
                        </button>

                    </div>
                    <p className="ml-10 my-3">You have no account. Please <NavLink to='/register' className='text-blue-600 font-bold'>Register</NavLink></p>
                </div>
                {
                    success && <p>{success}</p>
                }
            </div>
        </div>
    );
};

export default JoinUs;