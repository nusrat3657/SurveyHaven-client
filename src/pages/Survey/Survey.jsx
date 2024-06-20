import { Helmet } from "react-helmet-async";

const Survey = () => {
    return (
        <div>
            <Helmet>
                <title>SurveyHaven | Survey</title>
            </Helmet>
            <div className="relative w-full h-[250px]  my-5">
                <img src="https://i.ibb.co/w7Hd4rY/businessman-hands-using-cell-phone-with-financial-report-graph.jpg" className="w-full h-[280px]" />
                <div className="absolute items-center w-full h-[280px] left-0 top-0 bg-gradient-to-r from-[#151515]/70 to-[#151515]/0">
                    <div className="text-white pl-12 text-center mt-24">
                        <h2 className="text-6xl font-bold mb-2">Surveys</h2>
                    </div>
                </div>
            </div>
            <h2>This is Survey page</h2>
        </div>
    );
};

export default Survey;