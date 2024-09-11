import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { useToasts } from "react-toast-notifications";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGetUserByUidQuery } from "../../../redux/features/allApis/usersApi/UsersApi";
import Loader from "../../shared/Loader";
import { useGetOrdersQuery } from "../../../redux/features/allApis/ordersApi/ordersApi";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const { data: singleUser, isLoading } = useGetUserByUidQuery(user?.uid);
  const { data: orders, isLoading: orderLoading } = useGetOrdersQuery();
  const { addToast } = useToasts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState({
    users: true,
    course: true,
    website: true,
    video: true,
    order: true,
    frontend: true,
  });

  const pendingOrders = orders?.filter((order) => order.status === "pending");
  const myPendingOrders = pendingOrders?.filter(
    (order) => order.email === user?.email
  );

  const toggleCollapse = (dropdown) => {
    setCollapsed((prevState) => {
      const updatedCollapsed = {};
      Object.keys(prevState).forEach((key) => {
        updatedCollapsed[key] = key === dropdown ? !prevState[key] : true;
      });
      return updatedCollapsed;
    });
  };

  const handleLogout = async () => {
    try {
      await logOut();
      addToast("Logged out successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (loading || isLoading || orderLoading) return <Loader />;

  return (
    <div>
      {/* Hamburger icon for mobile menu */}
      <div className="lg:hidden">
        <FaBars
          size={35}
          className="text-black text-2xl cursor-pointer"
          onClick={toggleMobileMenu}
        />
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-gray-500 bg-opacity-50 w-64 h-screen transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="w-64 bg-gray-800 text-white h-full">
          <div className="flex justify-between items-center p-2">
            {/* Close button for mobile menu */}
            <FaTimes
              className="text-white text-2xl cursor-pointer"
              onClick={closeMobileMenu}
            />
          </div>
          <div className="px-5 pt-1">
            <Link onClick={closeMobileMenu} to="/">
              <h2 className="text-3xl font-bold text-center text-orange-500">
                Rabbit<span className="text-white">Code</span>
              </h2>
            </Link>
          </div>
          <div className="px-5 py-1 flex items-center gap-4">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <div>
              <p className="text-lg font-semibold text-white">
                {user?.displayName}
              </p>
              <p className="text-sm text-gray-300">{singleUser?.email}</p>
            </div>
          </div>
          <ul className="px-4 py-2 space-y-2 h-screen">
            <Link onClick={closeMobileMenu} to="/dashboard">
              <li className="text-white cursor-pointer bg-green-600 hover:bg-green-700 duration-300 py-1.5 px-3 flex gap-2 items-center lg:text-lg">
                Dashboard Home
              </li>
            </Link>
            {singleUser?.role === "admin" && (
              <li className="text-white cursor-pointer">
                <div
                  className="bg-green-600 hover:bg-green-700 duration-300 py-1.5 px-3 flex gap-2 items-center lg:text-lg"
                  onClick={() => toggleCollapse("website")}
                >
                  Websites
                </div>
                <ul
                  className={`pl-4 mt-2 text-sm lg:text-base ${
                    collapsed.website
                      ? "hidden"
                      : "block transition-all ease-in duration-500"
                  }`}
                >
                  <Link onClick={closeMobileMenu} to="/dashboard/add-website">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      Add Website
                    </li>
                  </Link>
                  <Link onClick={closeMobileMenu} to="/dashboard/all-websites">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      Websites List
                    </li>
                  </Link>
                </ul>
              </li>
            )}
            {singleUser?.role === "admin" && (
              <li className="text-white cursor-pointer">
                <div
                  className="bg-green-600 hover:bg-green-700 duration-300 py-1.5 px-3 flex gap-2 items-center lg:text-lg"
                  onClick={() => toggleCollapse("course")}
                >
                  Courses
                </div>
                <ul
                  className={`pl-4 mt-2 text-sm lg:text-base ${
                    collapsed.course
                      ? "hidden"
                      : "block transition-all ease-in duration-500"
                  }`}
                >
                  <Link onClick={closeMobileMenu} to="/dashboard/add-course">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      Add Course
                    </li>
                  </Link>
                  <Link onClick={closeMobileMenu} to="/dashboard/all-courses">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      All Courses
                    </li>
                  </Link>
                  <Link onClick={closeMobileMenu} to="/dashboard/admission">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      Admission
                    </li>
                  </Link>
                </ul>
              </li>
            )}
            {singleUser?.role === "admin" && (
              <li className="text-white cursor-pointer">
                <div
                  className="bg-green-600 hover:bg-green-700 duration-300 py-1.5 px-3 flex gap-2 items-center lg:text-lg"
                  onClick={() => toggleCollapse("video")}
                >
                  Videos
                </div>
                <ul
                  className={`pl-4 mt-2 text-sm lg:text-base ${
                    collapsed.video
                      ? "hidden"
                      : "block transition-all ease-in duration-500"
                  }`}
                >
                  <Link onClick={closeMobileMenu} to="/dashboard/add-video">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      Add & Manage Videos
                    </li>
                  </Link>
                </ul>
              </li>
            )}
            <li className="text-white cursor-pointer">
              <div
                className="bg-green-600 hover:bg-green-700 duration-300 py-1.5 px-3 flex gap-2 items-center lg:text-lg"
                onClick={() => toggleCollapse("order")}
              >
                Orders
                {singleUser?.role === "admin"
                  ? pendingOrders?.length > 0 && (
                      <span className="bg-red-600 text-white px-1">
                        {pendingOrders?.length}
                      </span>
                    )
                  : myPendingOrders?.length > 0 && (
                      <span className="bg-red-600 text-white px-1">
                        {myPendingOrders?.length}
                      </span>
                    )}
              </div>
              <ul
                className={`pl-4 mt-2 text-sm lg:text-base ${
                  collapsed.order
                    ? "hidden"
                    : "block transition-all ease-in duration-500"
                }`}
              >
                {singleUser?.role === "admin" && (
                  <Link onClick={closeMobileMenu} to="/dashboard/orders">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      Manage orders
                      {singleUser?.role === "admin"
                        ? pendingOrders?.length > 0 && (
                            <span className="bg-red-600 text-white px-1">
                              {pendingOrders?.length}
                            </span>
                          )
                        : myPendingOrders?.length > 0 && (
                            <span className="bg-red-600 text-white px-1">
                              {myPendingOrders?.length}
                            </span>
                          )}
                    </li>
                  </Link>
                )}
                {singleUser?.role === "student" && (
                  <Link onClick={closeMobileMenu} to="/dashboard/my-orders">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      My Orders
                      {myPendingOrders?.length > 0 && (
                        <span className="bg-red-600 text-white px-1">
                          {myPendingOrders?.length}
                        </span>
                      )}
                    </li>
                  </Link>
                )}
              </ul>
            </li>
            {singleUser?.role === "admin" && (
              <li className="text-white cursor-pointer">
                <div
                  className="bg-green-600 hover:bg-green-700 duration-300 py-1.5 px-3 flex gap-2 items-center lg:text-lg"
                  onClick={() => toggleCollapse("users")}
                >
                  Users
                </div>
                <ul
                  className={`pl-4 mt-2 text-sm lg:text-base ${
                    collapsed.users
                      ? "hidden"
                      : "block transition-all ease-in duration-500"
                  }`}
                >
                  <Link onClick={closeMobileMenu} to="/dashboard/users">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-1.5 px-3 w-full">
                      User List
                    </li>
                  </Link>
                </ul>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 duration-300 py-1.5 px-3 w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-screen bg-gray-800 w-64 text-white ">
        <div className="px-5 pt-4">
          <Link onClick={closeMobileMenu} to="/">
            <h2 className="text-4xl font-bold text-center text-orange-500">
              Rabbit<span className="text-white">Code</span>
            </h2>
          </Link>
        </div>
        <div className="px-5 py-2 flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
          <div>
            <p className="text-lg font-semibold text-white">
              {user?.displayName}
            </p>
            <p className="text-sm text-gray-300">{singleUser?.email}</p>
            <p className="text-sm text-gray-300">{singleUser?.role}</p>
          </div>
        </div>
        <ul
          style={{ overflow: "auto", scrollbarWidth: "none" }}
          className="px-5 py-2 space-y-2 h-screen"
        >
          <Link onClick={closeMobileMenu} to="/dashboard">
            <li className="text-white cursor-pointer bg-green-600 hover:bg-green-700 duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg">
              Dashboard Home
            </li>
          </Link>
          {singleUser?.role === "admin" && (
            <li className="text-white cursor-pointer">
              <div
                className="bg-green-600 hover:bg-green-700 duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg"
                onClick={() => toggleCollapse("website")}
              >
                Websites
              </div>
              <ul
                className={`pl-4 mt-2 text-sm lg:text-base ${
                  collapsed.website
                    ? "hidden"
                    : "block transition-all ease-in duration-500"
                }`}
              >
                <Link onClick={closeMobileMenu} to="/dashboard/add-website">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    Add Website
                  </li>
                </Link>
                <Link onClick={closeMobileMenu} to="/dashboard/all-websites">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    Websites List
                  </li>
                </Link>
              </ul>
            </li>
          )}
          {singleUser?.role === "admin" && (
            <li className="text-white cursor-pointer">
              <div
                className="bg-green-600 hover:bg-green-700 duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg"
                onClick={() => toggleCollapse("course")}
              >
                Courses
              </div>
              <ul
                className={`pl-4 mt-2 text-sm lg:text-base ${
                  collapsed.course
                    ? "hidden"
                    : "block transition-all ease-in duration-500"
                }`}
              >
                <Link onClick={closeMobileMenu} to="/dashboard/add-course">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    Add Course
                  </li>
                </Link>
                <Link onClick={closeMobileMenu} to="/dashboard/all-courses">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    All Courses
                  </li>
                </Link>
                <Link onClick={closeMobileMenu} to="/dashboard/admission">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    Admission
                  </li>
                </Link>
              </ul>
            </li>
          )}
          {singleUser?.role === "admin" && (
            <li className="text-white cursor-pointer">
              <div
                className="bg-green-600 hover:bg-green-700 duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg"
                onClick={() => toggleCollapse("video")}
              >
                Videos
              </div>
              <ul
                className={`pl-4 mt-2 text-sm lg:text-base ${
                  collapsed.video
                    ? "hidden"
                    : "block transition-all ease-in duration-500"
                }`}
              >
                <Link onClick={closeMobileMenu} to="/dashboard/add-video">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    Add & Manage Videos
                  </li>
                </Link>
              </ul>
            </li>
          )}
          <li className="text-white cursor-pointer">
            <div
              className="bg-green-600 hover:bg-green-700 duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg"
              onClick={() => toggleCollapse("order")}
            >
              Orders
              {singleUser?.role === "admin"
                ? pendingOrders?.length > 0 && (
                    <span className="bg-red-600 text-white px-1">
                      {pendingOrders?.length}
                    </span>
                  )
                : myPendingOrders?.length > 0 && (
                    <span className="bg-red-600 text-white px-1">
                      {myPendingOrders?.length}
                    </span>
                  )}
            </div>
            <ul
              className={`pl-4 mt-2 text-sm lg:text-base ${
                collapsed.order
                  ? "hidden"
                  : "block transition-all ease-in duration-500"
              }`}
            >
              {singleUser?.role === "admin" && (
                <Link onClick={closeMobileMenu} to="/dashboard/orders">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    Manage orders
                    {singleUser?.role === "admin"
                      ? pendingOrders?.length > 0 && (
                          <span className="bg-red-600 text-white px-1">
                            {pendingOrders?.length}
                          </span>
                        )
                      : myPendingOrders?.length > 0 && (
                          <span className="bg-red-600 text-white px-1">
                            {myPendingOrders?.length}
                          </span>
                        )}
                  </li>
                </Link>
              )}
              {singleUser?.role === "student" && (
                <Link onClick={closeMobileMenu} to="/dashboard/my-orders">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    My Orders
                    {myPendingOrders?.length > 0 && (
                      <span className="bg-red-600 text-white px-1">
                        {myPendingOrders?.length}
                      </span>
                    )}
                  </li>
                </Link>
              )}
            </ul>
          </li>
          {singleUser?.role === "admin" && (
            <li className="text-white cursor-pointer">
              <div
                className="bg-green-600 hover:bg-green-700 duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg"
                onClick={() => toggleCollapse("users")}
              >
                Users
              </div>
              <ul
                className={`pl-4 mt-2 text-sm lg:text-base ${
                  collapsed.users
                    ? "hidden"
                    : "block transition-all ease-in duration-500"
                }`}
              >
                <Link onClick={closeMobileMenu} to="/dashboard/users">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    User List
                  </li>
                </Link>
              </ul>
            </li>
          )}
          {singleUser?.role === "admin" && (
            <li className="text-white cursor-pointer">
              <div
                className="bg-green-600 hover:bg-green-700 duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg"
                onClick={() => toggleCollapse("frontend")}
              >
                Frontend Controls
              </div>
              <ul
                className={`pl-4 mt-2 text-sm lg:text-base ${
                  collapsed.frontend
                    ? "hidden"
                    : "block transition-all ease-in duration-500"
                }`}
              >
                <Link onClick={closeMobileMenu} to="/dashboard/home-control">
                  <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                    Home Control
                  </li>
                </Link>
              </ul>
            </li>
          )}

          <li>
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 hover:bg-red-700 duration-300 py-2 px-4 w-full"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
