import { Helmet } from "react-helmet-async";
import NavBar from "../Shared/NavBar/NavBar";

const Survey = () => {
    return (
        <div>
            <Helmet>
                <title>SurveyHaven | Survey</title>
            </Helmet>
            <NavBar></NavBar>
            <h2>This is Survey page</h2>
        </div>
    );
};

export default Survey;