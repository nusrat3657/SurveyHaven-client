import { useContext } from "react";
import { Navigate, } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <span className="loading loading-dots loading-lg lg: ml-[550px] mt-[300px]"></span>
    }

    if (user) {
        return children;
    }

    // return <Navigate  to='/login' state={{from: location?.pathname || '/'}} replace></Navigate>
    return <Navigate state={location.pathname || '/'} to='/login' replace></Navigate>
};

export default PrivateRoute;