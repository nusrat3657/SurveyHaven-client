import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Home = () => {
    const axiosSecure = useAxiosSecure();
    const [surveys, setSurveys] = useState([]);
    // console.log(surveys);
    const [topVote, setTopVote] = useState([]);
    const [topDate, setTopDate] = useState([]);

    const fetchSurveys = async () => {
        try {
            const response = await axiosSecure.get('/surveys');
            setSurveys(response.data);

            // Sort and slice data after surveys are fetched
            const sortedByVotes = [...response.data].sort((a, b) => b.totalVote - a.totalVote);
            setTopVote(sortedByVotes.slice(0, 6));

            const sortedByDate = [...response.data].sort((a, b) => new Date(b.date) - new Date(a.date));
            setTopDate(sortedByDate.slice(0, 6));
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
                <title>SurveyHaven | Home</title>
            </Helmet>
            <Banner></Banner>
            <h2 className="text-4xl font-semibold text-center mt-8">6 Most Voted Surveys</h2>
            <div className="divider"></div>
            <div className="md:grid grid-cols-3 lg:gap-10 space-y-3 my-14 gap-2">
                {
                    topVote.map(survey => <div key={survey._id} className="rounded-none lg:w-[300px] border-2 lg:p-8 shadow-2xl bg-blue-400/20 md:p-5 p-6 lg:hover:scale-105 animate__animated animate__zoomIn">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mt-4 mb-2">{survey.title}<span className="font-none text-sm"></span></h2>
                            <div className="divider"></div>
                            <p className="font-semibold mt-2">{survey.description}</p>
                            <p className="font-semibold mt-2">Total Votes: <span className="font-bold">{survey.totalVote}</span></p>
                            <div className="flex justify-end pt-4">
                                <Link to={`/details/${survey._id}`}><button className="btn text-white bg-blue-400">View Details</button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <h2 className="text-4xl font-semibold text-center mt-8">6 Most Voted Surveys</h2>
            <div className="divider"></div>
            <div className="md:grid grid-cols-3 lg:gap-10 space-y-3 my-14 gap-2">
                {
                    topDate.map(srv => <div key={srv._id} className="rounded-none lg:w-[300px] border-2 lg:p-8 shadow-2xl bg-blue-400/20 md:p-5 p-6 lg:hover:scale-105 animate__animated animate__zoomIn">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mt-4 mb-2">{srv.title}<span className="font-none text-sm"></span></h2>
                            <div className="divider"></div>
                            <p className="font-semibold mt-2">{srv.description}</p>
                            <p className="font-semibold mt-2">Total Votes: <span className="font-bold">{srv.totalVote}</span></p>
                            <div className="flex justify-end pt-4">
                                <Link to={`/details/${srv._id}`}><button className="btn text-white bg-blue-400">View Details</button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className=" p-5">
                <h2 className="text-4xl font-semibold text-center">How Our Survey Works?</h2>
                <div className="divider"></div>
                <p className="text-center w-[60%] mx-auto">fast and free registration in 3 minutes. Earn money today. Read emails and take surveys to earn money every day! Quick & Easy. 100% Free. Hundreds of gifts. free gifts. Free Surveys. save money. Win gifts. Free contests. Easy & Free. Quizzes. Services: Shopping vouchers, Coupons.</p>
            </div>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;