import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ResponseDetail = () => {
    const { id } = useParams();
    const [response, setResponse] = useState(null);
    const axiosSecure = useAxiosSecure();
    // console.log(response);
    let index = 0;

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const res = await axiosSecure.get(`/responses/${id}`);
                setResponse(res.data);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchSurvey();
    }, [id, axiosSecure]);

    return (
        <div>
            <Helmet>
                <title>SurveyHaven | ResponseDetail</title>
            </Helmet>
            <div className="mx-auto text-center md:w-4/12 my-5">
                <h3 className="text-2xl uppercase border-y-4 py-4">Response Details</h3>
            </div>
            {response ? (
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={id}>
                            <th>{index + 1}</th>
                            <td>{response.name}</td>
                            <td>{response.email}</td>
                            <td>{response.vote}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ResponseDetail;
