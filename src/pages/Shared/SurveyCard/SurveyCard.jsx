/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const SurveyCard = ({ survey }) => {
    // eslint-disable-next-line no-unused-vars
    const { _id, title, description, yesCount, noCount } = survey;
    const totalVote = yesCount + noCount
    return (
        <div className="rounded-none lg:w-[300px] border-2 lg:p-8 shadow-2xl bg-blue-400/20 md:p-5 p-6 lg:hover:scale-105 animate__animated animate__zoomIn">
            <div className="text-center">
                <h2 className="text-2xl font-bold mt-4 mb-2">{survey.title}<span className="font-none text-sm"></span></h2>
                <div className="divider"></div>
                <p className="font-semibold mt-2">{survey.description}</p>
                <p className="font-semibold mt-2">Total Votes: <span className="font-bold">{totalVote}</span></p>
                <div className="flex justify-end pt-4">
                    <Link to={`/details/${_id}`}><button className="btn text-white bg-blue-400">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default SurveyCard;