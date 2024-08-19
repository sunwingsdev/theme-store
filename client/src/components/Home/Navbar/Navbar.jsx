import { useContext, useState } from "react";
import { IoBookOutline, IoMenu, IoClose } from "react-icons/io5";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 bg-white z-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link to="/">
            <h2 className="text-4xl font-bold">
              <span className="text-orange-500">Sell</span>
              Website
            </h2>
          </Link>
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
              {/* <NavLink
              className={({ isActive }) =>
                `hover:border-b-2 hover:border-[#ff1e1e] ${
                  isActive && "border-b-2 border-[#ff1e1e]"
                }`
              }
              to="/success-story"
            >
              <li>Success story</li>
            </NavLink> */}
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
              {user && (
                <NavLink
                  className={`hover:border-b-2 hover:border-[#404040]`}
                  to="/dashboard"
                >
                  <li>Dashboard</li>
                </NavLink>
              )}
            </ul>
            {!user && (
              <Link to="/login">
                <div className="px-6 py-1 text-base font-semibold bg-orange-500 text-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-all duration-500">
                  Login
                </div>
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        } md:hidden`}
      >
        <div className="relative flex flex-col items-center justify-center h-full">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-3xl"
          >
            <IoClose />
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
            {/* <NavLink
              className={({ isActive }) =>
                `hover:border-b-2 hover:border-[#ff1e1e] ${
                  isActive && "border-b-2 border-[#ff1e1e]"
                }`
              }
              to="/success-story"
              onClick={toggleMenu}
            >
              <li>Success story</li>
            </NavLink> */}
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
            <NavLink
              className={`hover:border-b-2 hover:border-[#ff1e1e] `}
              to="/dashboard"
            >
              <li>Dashboard</li>
            </NavLink>
          </ul>
          <Link to="/courses" onClick={toggleMenu}>
            <PrimaryButton
              icon={IoBookOutline}
              text="Browse Course"
              arrow={true}
            ></PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
