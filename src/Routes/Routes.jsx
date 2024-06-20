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
                path: 'create',
                element: <CreateSurvey></CreateSurvey>
            },

            // admin routes
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
  ]);