import {
  createBrowserRouter,
} from "react-router-dom"; 

import Root from "../Components/Root/Root";
import Postform from "../Components/Postform";

import MyPostedTasks from "../Components/MyPostedTasks";
import UpdateTask from "../Components/UpdateTask";
import Taskdetails from "../Components/Taskdetails";
import Home from "../Components/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";

async function dataLoader() {
  const response = await fetch('https://freelance-site-tawny.vercel.app/freelancer');
  return response.json();
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: dataLoader,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,      
       },
      {
        path: "/taskdetails/:id",
        element: <PrivateRoute><Taskdetails /></PrivateRoute>,
        loader: async ({ params }) => {
          const res = await fetch(`https://freelance-site-tawny.vercel.app/freelancer/${params.id}`);
          return res.json();
        }
      }
      ,
      {
        path:"/formpost",
        element: <PrivateRoute><Postform /></PrivateRoute>,
      },
      {
        path:"/myposts",
        element: <PrivateRoute><MyPostedTasks /></PrivateRoute>,
      },
      {
        path:"/updatetask/:id",
        element: <PrivateRoute><UpdateTask /></PrivateRoute>,
        loader: async ({ params }) => {
          const res = await fetch(`https://freelance-site-tawny.vercel.app/freelancer/${params.id}`);
          return res.json();
        }
      },

    ],
    errorElement: (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
    <h1 className="text-6xl font-extrabold mb-4">404</h1>
    <p className="text-2xl font-semibold mb-2">Page Not Found</p>
    <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
    <a
      href="/"
      className="btn btn-neutral"
    >
      Go Back Home
    </a>
  </div>
)
  },
]);

export default router;
