import { Link } from "react-router-dom";
import banner from "../../../assets/customer-experience-creative-collage.jpg"
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
    return (
        <div>
            <div className="relative w-full h-[500px]  my-5">
                <img src={banner} className="w-full h-[500px]" />
                <div className="absolute items-center w-full h-[500px] left-0 top-0 bg-gradient-to-r from-[#151515]/70 to-[#151515]/0">
                    <div className="text-white pl-12 text-left mt-24">
                        <h2 className="text-6xl font-bold w-[600px] mb-2">A global leader in survey software. 20 million questions answered daily.</h2>
                        <Link to='/survey'><button className="btn btn-outline text-white mt-4">Explore More<FaArrowRight /></button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;