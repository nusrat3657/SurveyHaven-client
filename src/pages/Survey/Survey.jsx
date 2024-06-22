import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import SurveyCard from "../Shared/SurveyCard/SurveyCard";

const Survey = () => {

    const axiosSecure = useAxiosSecure();
    const [surveys, setSurveys] = useState([]);
    const [filteredSurveys, setFilteredSurveys] = useState([]);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState(''); // 'asc' for ascending, 'desc' for descending

    const fetchSurveys = async () => {
        try {
            const response = await axiosSecure.get('/surveys');
            setSurveys(response.data);
            setFilteredSurveys(response.data);
        } catch (error) {
            // console.error(error);
        }
    };

    useEffect(() => {
        fetchSurveys();
    }, []);

    useEffect(() => {
        let filtered = surveys;
     

        if (category) {
            filtered = filtered.filter(survey => survey.category === category);
        }

        if (sort === 'asc') {
            filtered = filtered.sort((a, b) => a.totalVote - b.totalVote);
        } else if (sort === 'desc') {
            filtered = filtered.sort((a, b) => b.totalVote - a.totalVote);
        }

        setFilteredSurveys(filtered);
    }, [category, sort, surveys]);


    return (
        <div>
            <Helmet>
                <title>SurveyHaven | Survey</title>
            </Helmet>
            <div className="relative w-full h-[250px]  my-10">
                <img src="https://i.ibb.co/w7Hd4rY/businessman-hands-using-cell-phone-with-financial-report-graph.jpg" className="w-full h-[280px]" />
                <div className="absolute items-center w-full h-[280px] left-0 top-0 bg-gradient-to-r from-[#151515]/70 to-[#151515]/0">
                    <div className="text-white pl-12 text-center mt-24">
                        <h2 className="text-6xl font-bold mb-2">Surveys</h2>
                    </div>
                </div>
            </div>
            <div>
                <div className="filters flex justify-evenly">
                    <label className="flex items-center">
                        <h2 className="font-bold">Category:</h2>
                        <select className="select select-bordered w-full max-w-xs" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All</option>
                            <option value="Customer Service">Customer Service</option>
                            <option value="Product">Product</option>
                            <option value="Website">Website</option>
                            <option value="Employee">Employee</option>
                            <option value="Event">Event</option>
                            <option value="Training">Training</option>
                            <option value="Community">Community</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Support">Support</option>
                        </select>
                    </label>

                    <label className="flex items-center">
                    <h2 className="font-bold">Sort by votes:</h2>
                        <select className="select select-bordered w-full max-w-xs" value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="">None</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                </div>

                <div className="md:grid grid-cols-3 lg:gap-10 space-y-3 my-14 gap-2">
                    {filteredSurveys.map((survey) => (<SurveyCard key={survey._id} survey={survey}></SurveyCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Survey;