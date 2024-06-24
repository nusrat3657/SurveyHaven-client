import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../providers/AuthProvider";

const Response = () => {

    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [surveys, setSurveys] = useState([]);
    const remaining = surveys.filter(survey => survey.email === user.email);

    const fetchSurveys = async () => {
        try {
            const response = await axiosSecure.get('/responses');
            setSurveys(response.data);
        } catch (error) {
            // console.error(error);
        }
    };

    useEffect(() => {
        fetchSurveys();
    }, []);

    return (
        <div>
            <Helmet>
                <title>SurveyHaven | Responses</title>
            </Helmet>
            <div className="mx-auto text-center md:w-4/12 my-5">
                <h3 className="text-2xl uppercase border-y-4 py-4">Responses</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Response No</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Deadline</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {remaining.map((srv, index) => <tr key={srv._id}>
                            <th>{index + 1}</th>
                            <td>{srv.title}</td>
                            <td>{srv.category}</td>
                            <td>{srv.deadline}</td>
                            <td><Link to={`/dashboard/detail/${srv._id}`}>
                                <button
                                    className="btn btn-ghost btn-sm text-white bg-blue-400">
                                    Details
                                </button>
                            </Link></td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Response;