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
import AddWebsite from "../pages/Dashboard/AddWebsite/AddWebsite";
import UsersList from "../pages/Dashboard/UsersList/UsersList";
import Product from "../pages/Home/product/Product";
import DashboardHome from "../pages/Dashboard/dashboardHome/DashboardHome";
import AllCoursesList from "../pages/Dashboard/AllCoursesList/AllCoursesList";
import AddCourse from "../pages/Dashboard/AddCourse/AddCourse";
import WebsiteList from "../pages/Dashboard/WebsiteList/WebsiteList";

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
        path: "/product",
        element: <Product />,
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
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "admission-student",
        element: <AdmissionStudent />,
      },
      {
        path: "add-website",
        element: <AddWebsite />,
      },
      {
        path: "all-websites",
        element: <WebsiteList />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "all-courses",
        element: <AllCoursesList />,
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
