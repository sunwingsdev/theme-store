import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AdmissionStudent from "../pages/Dashboard/AdmissionStudent/AdmissionStudent";
import Register from "../pages/Home/register/Register";
import Login from "../pages/Home/login/Login";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import Contact from "../pages/Home/Contact/Contact";
import PopularCourse from "../components/Home/PopularCourse/PopularCourse";
import AdmissionDetails from "../components/Dashboard/Sidebar/AdmissionDetails/AdmissionDetails";
import WebsiteDetails from "../pages/Home/websiteDetails/WebsiteDetails";
import AddWebsite from "../pages/Dashboard/AddCourse/AddWebsite";
import UsersList from "../pages/Dashboard/UsersList/UsersList";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/courses",
        element: <PopularCourse />,
      },
      {
        path: "/single-website-details/:id",
        element: <WebsiteDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admission-student",
        element: <AdmissionStudent />,
      },
      {
        path: "add-website",
        element: <AddWebsite />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admissionDetails",
    element: <AdmissionDetails />,
  },
]);
export default Router;
