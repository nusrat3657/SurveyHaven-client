import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Update = () => {

    const axiosSecure = useAxiosSecure();
    const [surveys, setSurveys] = useState([]);

    const fetchSurveys = async () => {
        try {
            const response = await axiosSecure.get('/surveys');
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
                <title>SurveyHaven | Survey</title>
            </Helmet>
            <div className="mx-auto text-center md:w-4/12 my-5">
                <h3 className="text-2xl uppercase border-y-4 py-4">Update Survey</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Deadline</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey, index) => <tr key={survey._id}>
                            <th>{index + 1}</th>
                            <td>{survey.title}</td>
                            <td>{survey.category}</td>
                            <td>{survey.deadline}</td>
                            <td><Link to={`/dashboard/updates/${survey._id}`}>
                                <button
                                    className="btn btn-ghost btn-md bg-blue-400">
                                    <FaEdit className="text-white"></FaEdit>
                                </button>
                            </Link></td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Update;