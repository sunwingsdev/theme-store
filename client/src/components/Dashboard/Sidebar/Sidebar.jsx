import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { useToasts } from "react-toast-notifications";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons

const Sidebar = () => {
  const { logOut } = useContext(AuthContext);
  const { addToast } = useToasts();
  const [collapsed, setCollapsed] = useState({
    admission: true,
    branch: true,
    saleHistory: true,
    stockManager: true,
    paymentGateway: true,
    setting: true,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleCollapse = (dropdown) => {
    setCollapsed((prevState) => {
      const updatedCollapsed = {};
      // Close all collapses except the one being toggled
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

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="z-40 lg:w-1/5">
      {/* Hamburger icon for mobile menu */}
      <div className="lg:hidden inline-block">
        <FaBars
          size={35}
          className="text-black text-2xl cursor-pointer"
          onClick={toggleMobileMenu}
        />
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-start">
          <div className="w-64 bg-gray-800 text-white">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-lg font-semibold">Menu</h1>
              {/* Close button for mobile menu */}
              <FaTimes
                className="text-white text-2xl cursor-pointer"
                onClick={closeMobileMenu}
              />
            </div>
            <ul className="p-4">
              <li className="cursor-pointer py-2 px-4">
                <div
                  className="bg-green-600 hover:bg-green-700 duration-300 py-2 px-4 flex gap-2 items-center"
                  onClick={() => toggleCollapse("admission")}
                >
                  Admission
                </div>
                <ul
                  className={`pl-4 mt-2 ${
                    collapsed.admission
                      ? "hidden"
                      : "block transition-all ease-in duration-500"
                  }`}
                >
                  <Link to="/dashboard/admission-student">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                      Admission Student List
                    </li>
                  </Link>
                  <Link to="/dashboard/add-course">
                    <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                      Add Course
                    </li>
                  </Link>
                </ul>
              </li>
              <li
                className="cursor-pointer bg-green-600 hover:bg-green-700 duration-300 py-2 px-4"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* Desktop menu */}
      <div className="hidden lg:block bg-slate-500 h-screen">
        <ul className="flex gap-2 flex-col p-4 text text-base">
          <li className="text-white cursor-pointer">
            <div
              className="bg-green-600 hover:bg-green-700  duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg"
              onClick={() => toggleCollapse("admission")}
            >
              Admission
            </div>
            <ul
              className={`pl-4 mt-2 text-sm lg:text-base ${
                collapsed.admission
                  ? "hidden"
                  : "block transition-all ease-in duration-500"
              }`}
            >
              <Link to="/dashboard/admission-student">
                <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                  Admission Student List
                </li>
              </Link>
              <Link to="/dashboard/add-course">
                <li className="bg-green-500 hover:bg-green-600 mb-2 py-2 px-4 w-full">
                  Add Course
                </li>
              </Link>
            </ul>
          </li>
          <Link to="/">
            <li className="text-white cursor-pointer bg-green-600 hover:bg-green-700  duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg">
              Home
            </li>
          </Link>
          <li
            onClick={handleLogout}
            className="text-white cursor-pointer bg-green-600 hover:bg-green-700  duration-300 py-2 px-4 flex gap-2 items-center lg:text-lg"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
