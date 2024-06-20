/* eslint-disable react/no-unescaped-entities */
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const { user, signIn, googleLogin, githubLogin, loading } = useContext(AuthContext);
    const  axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const location = useLocation();
    const from = location?.state || '/'


    // console.log('location in the login page', location);

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        const { email, password } = data
        signIn(email, password)
            .then(result => {
                // console.log(result.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Logged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                if (result.user) {
                    navigate(from);
                }
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

    const handleLogin = provider => {
        provider()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                    navigate(from);
                })

            })
    }
    if (user || loading) return
    return (
        <div>
            <Helmet><title>Survey Haven | Login</title></Helmet>
            <div className="flex">
                <div className="max-w-96 lg:mt-36">
                    <img src="https://i.ibb.co/FbJ2yxC/Customer-Survey-bro.png" alt="" />
                </div>
                <div className="bg-blue-400/20 rounded-lg md:w-3/4 lg:w-1/2 mx-auto lg:p-10 md:p-10 p-3 my-10">

                    <h2 className="text-4xl text-center font-bold  font-league">Login Your Account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your email" className="input input-bordered"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span className="text-red-500">This field is required</span>}
                                <span className="absolute top-4 -ml-8" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-md font-semibold mt-2">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-blue-400 text-white font-semibold text-lg">Login</button>
                        </div>
                    </form>
                    <p className="font-semibold text-center">Don't have an account? Please <Link to='/signup' className="text-red-500">Create an account</Link></p>
                    <div className='p-2  mt-6 flex justify-evenly'>
                        <button onClick={() => handleLogin(googleLogin)} className="btn btn-outline hover:bg-blue-400">
                            <FaGoogle></FaGoogle>
                            Login with Google
                        </button>
                        <button onClick={() => handleLogin(githubLogin)} className="btn btn-outline hover:bg-blue-400">
                            <FaGithub></FaGithub>
                            Login with Github
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;