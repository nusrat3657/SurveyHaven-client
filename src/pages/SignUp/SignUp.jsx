import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const from = location?.state || '/'

    const navigate = useNavigate();
    // console.log('location in the login page', location);

    const onSubmit = (data) => {
        const { email, password, image, fullName } = data;

        if (password.length < 6) {
            toast.warn('Password  must be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast.warn('Password must have an Uppercase letter');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            toast.warn('Password must have a Lowercase letter');
            return;
        }

        // create user
        createUser(email, password,)
            .then(() => {
                updateUserProfile(fullName, image)
                    .then(() => {
                        const userInfo = {
                            name: fullName,
                            email: email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user addeded to the database');
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                                navigate(from);
                            })

                    })
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: (error.message)
                });
            })


    }

    return (
        <div>
            <Helmet><title>Survey Haven | SignUp</title></Helmet>
            <div className="flex my-10">
                <div className="max-w-96 lg:mt-36">
                    <img src="https://i.ibb.co/0mgFB7d/Customer-Survey-cuate.png" alt="" />
                </div>
                <div className="bg-blue-400/20 rounded-lg md:w-3/4 lg:w-1/2 mx-auto p-10">
                    <h2 className="text-3xl  text-center font-bold ">SignUp Your Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Your Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Enter Your Name" className="input input-bordered"  {...register("fullName", { required: true })} />
                            {errors.fullName && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your email address" className="input input-bordered" {...register("email", { required: true })} />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Photo URL</span>
                            </label>
                            <input type="text" name="image" placeholder="Enter Your photo url" className="input input-bordered" {...register("image")} />
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full" {...register("password", { required: true })} />
                                {errors.password && <span className="text-red-500">This field is required</span>}
                                <span className="absolute top-4 -ml-8" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-blue-400 text-white font-semibold text-lg">Register</button>
                        </div>
                    </form>
                    <p className="font-semibold text-center">Already have an account? Please <Link to='/login' className="text-red-500">Login</Link></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;