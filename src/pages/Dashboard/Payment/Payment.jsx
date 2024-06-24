import { Helmet } from "react-helmet-async";

const Payment = () => {
    return (
        <div>
            <Helmet>
                <title>SurveyHaven | Responses</title>
            </Helmet>
            <div className="mx-auto text-center md:w-4/12 my-5">
                <h3 className="text-2xl uppercase border-y-4 py-4">Payment a Survey</h3>
            </div>
            
        </div>
    );
};

export default Payment;