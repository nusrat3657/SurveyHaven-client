import Footer from "../../Shared/Footer/Footer";
import NavBar from "../../Shared/NavBar/NavBar";
import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import { Helmet } from 'react-helmet-async'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SurveyHaven | Home</title>
            </Helmet>
            <NavBar></NavBar>
            <Banner></Banner>
            <FAQ></FAQ>
            <Footer></Footer>
        </div>
    );
};

export default Home;