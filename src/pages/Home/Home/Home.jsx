import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import { Helmet } from 'react-helmet-async'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SurveyHaven | Home</title>
            </Helmet>
            <Banner></Banner>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;