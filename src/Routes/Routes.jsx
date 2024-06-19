import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Survey from "../pages/Survey/Survey";


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
        }
      ]
    },
  ]);