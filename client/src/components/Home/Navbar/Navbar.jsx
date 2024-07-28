import { useState } from "react";
import { IoBookOutline, IoMenu, IoClose } from "react-icons/io5";
import logo from "../../../assets/logo/logo.png";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 bg-white z-20 px-4">
      <div className="flex items-center justify-between container mx-auto py-2">
        <img className="w-20" src={logo} alt="Logo" />
        <div className="hidden md:flex flex-row gap-8">
          <ul className="flex flex-row items-center justify-center gap-8 text-lg font-semibold text-[#1f1e1e]">
            <NavLink
              className={({ isActive }) =>
                `hover:border-b-2 hover:border-[#ff1e1e] ${
                  isActive && "border-b-2 border-[#ff1e1e]"
                }`
              }
              to="/"
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
                `hover:border-b-2 hover:border-[#ff1e1e] ${
                  isActive && "border-b-2 border-[#ff1e1e]"
                }`
              }
              to="/contact"
            >
              <li>Contact</li>
            </NavLink>
            <NavLink
              className={`hover:border-b-2 hover:border-[#ff1e1e]`}
              to="/dashboard"
            >
              <li>Dashboard</li>
            </NavLink>
          </ul>
          <Link to="/courses">
            <PrimaryButton
              icon={IoBookOutline}
              text="Browse Course"
              arrow={true}
            ></PrimaryButton>
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
          </button>
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
