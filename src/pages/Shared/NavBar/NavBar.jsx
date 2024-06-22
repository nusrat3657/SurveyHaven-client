import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";


const NavBar = () => {

    const {user, logOut} = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged Out Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch()
    }

    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/survey'>Survey</Link></li>
        <li><Link to='/pricing'>Pricing</Link></li>
        <li><Link to='/dashboard/reports'>My Reports</Link></li>
    </>

    return (
        <div>
            <>
                <div className="navbar fixed z-10 bg-opacity-50 max-w-screen-lg bg-blue-400 text-white">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navOptions}
                            </ul>
                        </div>
                        <a className="btn btn-ghost text-xl lobster-regular">Survey<span className="text-blue-400">Haven</span></a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {
                            user ?
                                <>
                                    <button onClick={handleSignOut} className="btn  bg-blue-400 text-white text-lg px-8 border-none rounded-none mr-3">Log Out</button>

                                    <div className="dropdown dropdown-end relative z-30 tooltip" data-tip={user?.displayName || "User Name not found"}>
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className=" rounded-full" >
                                                <img alt="" src={user?.photoURL
                                                    || "https://i.ibb.co/Y0RBQqQ/download.png"} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <Link to='/login'>
                                        <button className="btn rounded-none border-none bg-blue-400 text-white text-lg px-8 mr-3">Login</button>
                                    </Link>
                                    <Link to='/register'>
                                        {/* <button className="btn rounded-none bg-blue-400 text-white text-lg px-8 ">Register</button> */}
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </>
        </div>
    );
};

export default NavBar;