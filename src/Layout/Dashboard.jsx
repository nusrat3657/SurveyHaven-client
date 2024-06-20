import { FaComment, FaEdit, FaHome, FaList, FaMobile, FaMoneyBill, FaProductHunt, FaUsers } from "react-icons/fa";
import {  FaRankingStar } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    // const isSurveyor = true;
    const isAdmin = true;

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-blue-400">
                <ul className="menu p-4">
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
                                    <NavLink to='/dashboard/create'>
                                        <FaEdit></FaEdit>
                                        Create Survey</NavLink>
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