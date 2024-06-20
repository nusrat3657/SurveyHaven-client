/* eslint-disable react/no-unescaped-entities */
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    return (
        <>
            <Helmet><title>Survey Haven | Error</title></Helmet>
            <div className="text-center px-28 mb-20">
                <img className='max-w-[600px] h-[450px] mx-auto' src="https://i.ibb.co/FXH1hKp/404-error-with-a-tired-person-pana.png" alt="" />
                <div className=" text-center">
                    <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded bg-blue-400 text-gray-50"><Link to="/">Back to homepage</Link></a>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;