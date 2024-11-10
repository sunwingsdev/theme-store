import { useContext, useState } from "react";
import { IoBookOutline, IoMenu, IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useToasts } from "react-toast-notifications";
import oracleLogo from "../../../assets/logo/oracle-logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { addToast } = useToasts();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  return (
    <div className="sticky top-0 bg-white z-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="">
            <Link to="/">
              <img className="w-40" src={oracleLogo} alt="logo" />
              {/* <h2 className="text-4xl font-bold">
                <span className="text-orange-500">Oracle</span> Technology
              </h2> */}
            </Link>
          </div>
          <div className="hidden md:flex flex-row gap-8">
            <ul className="flex flex-row items-center justify-center gap-8 text-base font-semibold text-[#1f1e1e]">
              <NavLink
                className={({ isActive }) =>
                  `hover:border-b-2 hover:border-[#404040] ${
                    isActive && "border-b-2 border-[#404040]"
                  }`
                }
                to="/"
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `hover:border-b-2 hover:border-[#404040] ${
                    isActive && "border-b-2 border-[#404040]"
                  }`
                }
                to="/product"
              >
                <li>Product</li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `hover:border-b-2 hover:border-[#404040] ${
                    isActive && "border-b-2 border-[#404040]"
                  }`
                }
                to="/about-us"
              >
                <li>About us</li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `hover:border-b-2 hover:border-[#404040] ${
                    isActive && "border-b-2 border-[#404040]"
                  }`
                }
                to="/contact"
              >
                <li>Contact</li>
              </NavLink>
            </ul>
            {!user && (
              <Link to="/login">
                <div className="px-6 py-1 text-base font-semibold bg-orange-500 text-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-all duration-500">
                  Login
                </div>
              </Link>
            )}
            {user && (
              <div className="relative">
                <img
                  src={user?.photoURL || "/default-profile.png"} // Replace with your user image or default image
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={toggleDropdown}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <IoClose className="size-8" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {user && (
                    <img className="size-10" src={user?.photoURL} alt="" />
                  )}
                  <IoMenu className="size-8" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="relative flex flex-col items-center justify-center h-full">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-3xl"
          >
            <IoClose className="size-8" />
          </button>
          <ul className="flex flex-col items-center justify-center gap-8 text-lg font-semibold text-[#1f1e1e]">
            <NavLink
              className={({ isActive }) =>
                `hover:border-b-2 hover:border-[#ff1e1e] ${
                  isActive && "border-b-2 border-[#ff1e1e]"
                }`
              }
              to="/"
              onClick={toggleMenu}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `hover:border-b-2 hover:border-[#ff1e1e] ${
                  isActive && "border-b-2 border-[#ff1e1e]"
                }`
              }
              to="/about-us"
              onClick={toggleMenu}
            >
              <li>About us</li>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `hover:border-b-2 hover:border-[#ff1e1e] ${
                  isActive && "border-b-2 border-[#ff1e1e]"
                }`
              }
              to="/contact"
              onClick={toggleMenu}
            >
              <li>Contact</li>
            </NavLink>
            {!user && (
              <Link to="/login">
                <div className="px-6 py-1 text-base font-semibold bg-orange-500 text-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-all duration-500">
                  Login
                </div>
              </Link>
            )}
            {user && (
              <NavLink
                className={`hover:border-b-2 hover:border-[#ff1e1e] `}
                to="/dashboard"
                onClick={toggleMenu}
              >
                <li>Dashboard</li>
              </NavLink>
            )}
          </ul>
          <Link to="/courses" className="mt-4" onClick={toggleMenu}>
            <PrimaryButton
              icon={IoBookOutline}
              text="Browse Course"
              arrow={true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
