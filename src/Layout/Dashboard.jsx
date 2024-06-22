import { FaComment, FaCreativeCommons, FaEdit, FaHome, FaList, FaMobile, FaMoneyBill, FaProductHunt, FaUsers } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useSurveyor from "../hooks/useSurveyor";

const Dashboard = () => {

    const [isSurveyor] = useSurveyor();
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-blue-400">
                <ul className="menu p-4">
                    <h2 className="text-xl font-bold bg-white text-blue-400 p-2 text-center">Dashboard</h2>
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to='/dashboard/users'>
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/surveys'>
                                    <FaProductHunt></FaProductHunt>
                                    Surveys</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/responses/:id'>
                                    <FaRankingStar></FaRankingStar>
                                    Responses</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/payments'>
                                    <FaMoneyBill></FaMoneyBill>
                                    Payments</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/reports'>
                                        <FaList></FaList>
                                        My Reports</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/comments'>
                                        <FaComment></FaComment>
                                        My Comments</NavLink>
                                </li>
                            </>
                    }
                    <div className="divider"></div>

                    {
                        isSurveyor || !isAdmin ? <>

                            <li>
                                <NavLink to='/dashboard/create'>
                                    <FaCreativeCommons></FaCreativeCommons>
                                    Create Survey</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/update'>
                                    <FaEdit></FaEdit>
                                    Update</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/updates/:id'>
                                    <FaEdit></FaEdit>
                                    Update Form</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/responses/:id'>
                                    <FaRankingStar></FaRankingStar>
                                    Responses</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/payments'>
                                    <FaMoneyBill></FaMoneyBill>
                                    Payments</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/reports'>
                                        <FaList></FaList>
                                        My Reports</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/comments'>
                                        <FaComment></FaComment>
                                        My Comments</NavLink>
                                </li>
                            </>
                    }

                    {/* {
                        isSurveyor ? <>
                            <li>
                                <NavLink to='/dashboard/create'>
                                    <FaCreativeCommons></FaCreativeCommons>
                                    Create Survey</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/update'>
                                    <FaEdit></FaEdit>
                                    Update</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/responses'>
                                    <FaRankingStar></FaRankingStar>
                                    Responses</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/payments'>
                                    <FaMoneyBill></FaMoneyBill>
                                    Payments</NavLink>
                            </li>
                            
                        </>
                            :
                            <>
                            <li>
                                <NavLink to='/dashboard/reports'>
                                    <FaList></FaList>
                                    My Reports</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/comments'>
                                    <FaComment></FaComment>
                                    My Comments</NavLink>
                            </li>
                            </>

                    } */}

                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/survey'>
                            <FaMobile></FaMobile>
                            Surveys</NavLink>
                    </li>
                    <li>
                        <NavLink to='/pricing'>
                            <FaMoneyBill></FaMoneyBill>
                            Pricing</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;