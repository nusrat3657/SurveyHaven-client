import {  useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Pricing = () => {
    // const {user} = useContext(AuthContext);
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
                <title>SurveyHaven | Pricing</title>
            </Helmet>
            <div className="relative w-full h-[250px]  my-5">
                <img src="https://i.ibb.co/w7Hd4rY/businessman-hands-using-cell-phone-with-financial-report-graph.jpg" className="w-full h-[280px]" />
                <div className="absolute items-center w-full h-[280px] left-0 top-0 bg-gradient-to-r from-[#151515]/70 to-[#151515]/0">
                    <div className="text-white pl-12 text-center mt-24">
                        <h2 className="text-6xl font-bold mb-2">Pricing</h2>
                    </div>
                </div>
            </div>
            <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
                <div className="container p-4 mx-auto sm:p-10">
                    <div className="mb-12 space-y-4 text-center">
                        <h1 className="text-4xl font-semibold leading-tight">Pricing</h1>
                        <p className="px-4 sm:px-8 lg:px-24">Please payment your interested Survey!</p>
                    </div>
                    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:grid-cols-3 lg:max-w-full">
                        {
                            surveys.map(survey => <div key={survey._id} className="flex flex-col overflow-hidden border-2 rounded-md dark:border-gray-300">
                                <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 dark:bg-gray-100">
                                    <p className="text-lg font-medium">{survey.title}</p>
                                    <p className="text-5xl font-bold">{survey.price}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-center px-2 py-8 dark:bg-gray-50">
                                    <button className="btn bg-green-500 text-white px-6 py-2 mt-6 text-lg font-semibold rounded sm:mt-12 dark:bg-default-600 dark:text-gray-50">Payment</button>
                                </div>
                            </div>)
                        }
                        
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;