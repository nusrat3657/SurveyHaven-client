import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useSurveyor from "../hooks/useSurveyor";
import { Navigate, useLocation } from "react-router-dom";

const SurveyorRoute = (children) => {
    const [user, loading] = useContext(AuthContext);
    const [isSurveyor, isSurveyorLoading] = useSurveyor();
    const location = useLocation();

    if (loading || isSurveyorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if(user && isSurveyor) {
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default SurveyorRoute;