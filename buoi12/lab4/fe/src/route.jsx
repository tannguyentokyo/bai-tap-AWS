import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Login from "./container/LoginView";
import Register from "./container/RegisterView";
import TodoView from "./container/TodoView";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/',
        element: <TodoView/>,
    },
]);

export default router;
