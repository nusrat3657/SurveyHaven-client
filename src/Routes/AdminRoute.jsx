import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

const AdminRoute = ( children ) => {
    const [user, loading] = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <span className="loading loading-dots loading-lg lg: ml-[550px] mt-[300px]"></span>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate state={location.pathname || '/'} to='/login' replace></Navigate>
};

export default AdminRoute;