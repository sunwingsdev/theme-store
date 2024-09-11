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
import AddVideo from "../pages/Dashboard/AddVideo/AddVideo";
import Checkout from "../pages/Home/Checkout/Checkout";
import Orders from "../pages/Dashboard/Orders/Orders";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import AdminRoute from "./AdminRoute";
import AddCategory from "../pages/Dashboard/AddCategory/AddCategory";
import OrderSuccess from "../pages/Home/OrderSuccess/OrderSuccess";
import PrivacyPolicy from "../pages/Home/PrivacyPolicy/PrivacyPolicy";
import HomeControl from "../pages/Dashboard/HomeControl/HomeControl";

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
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/courses",
        element: <PopularCourse />,
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/single-website-details/:id",
        element: <WebsiteDetails />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
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
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "admission-student",
        element: (
          <AdminRoute>
            <AdmissionStudent />
          </AdminRoute>
        ),
      },
      {
        path: "add-website",
        element: (
          <AdminRoute>
            <AddWebsite />
          </AdminRoute>
        ),
      },
      {
        path: "add-category",
        element: (
          <AdminRoute>
            <AddCategory />
          </AdminRoute>
        ),
      },
      {
        path: "all-websites",
        element: (
          <AdminRoute>
            <WebsiteList />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UsersList />
          </AdminRoute>
        ),
      },
      {
        path: "add-course",
        element: (
          <AdminRoute>
            <AddCourse />
          </AdminRoute>
        ),
      },
      {
        path: "all-courses",
        element: (
          <AdminRoute>
            <AllCoursesList />
          </AdminRoute>
        ),
      },
      {
        path: "admission",
        element: (
          <AdminRoute>
            <AdmissionStudent />
          </AdminRoute>
        ),
      },
      {
        path: "add-video",
        element: (
          <AdminRoute>
            <AddVideo />
          </AdminRoute>
        ),
      },
      {
        path: "home-control",
        element: (
          <AdminRoute>
            <HomeControl />
          </AdminRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
      {
        path: "my-orders",
        element: <MyOrders />,
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
