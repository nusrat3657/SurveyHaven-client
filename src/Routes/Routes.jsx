import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Survey from "../pages/Survey/Survey";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Secret from "../pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Pricing from "../pages/Pricing/Pricing";
import CreateSurvey from "../pages/Dashboard/CreateSurvey/CreateSurvey";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import MyReports from "../pages/Dashboard/MyReports/MyReports";
import Details from "../pages/Details/Details";
import Update from "../pages/Dashboard/Update/Update";
import UpdateForm from "../pages/Dashboard/UpdateForm/UpdateForm";
import Response from "../pages/Dashboard/Response/Response";
import AdminRoute from "./AdminRoute";
import SurveyorRoute from "./SurveyorRoute";
import ResponseDetail from "../pages/ResponseDetail/ResponseDetail";
import Payment from "../pages/Dashboard/Payment/Payment";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element:<Home></Home>
        },
        {
            path: '/survey',
            element: <Survey></Survey>
        },
        {
            path: '/details/:id',
            element: <Details></Details>
        },
        {
            path: 'pricing',
            element: <Pricing></Pricing>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <SignUp></SignUp>
        },
        {
            path: '/secret',
            element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'reports',
                element: <MyReports></MyReports>
            },

            // surveyor routes
            {
                path: 'create',
                element: <SurveyorRoute><CreateSurvey></CreateSurvey></SurveyorRoute>
            },
            {
                path: 'update',
                element: <SurveyorRoute><Update></Update></SurveyorRoute>
            },
            {
                path: 'updates/:id',
                element: <SurveyorRoute><UpdateForm></UpdateForm></SurveyorRoute>

            },
            {
                path: 'responses/:id',
                element: <SurveyorRoute><Response></Response></SurveyorRoute>
            },
            {
                path: 'detail/:id',
                element: <SurveyorRoute><ResponseDetail></ResponseDetail></SurveyorRoute>
            },

            // admin routes
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'payments',
                element: <AdminRoute><Payment></Payment></AdminRoute>
            },
            // {
            //     path: 'responses/:id',
            //     element: <AdminRoute><Response></Response></AdminRoute>
            // },
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
  ]);