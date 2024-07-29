import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

const NavbarTop = () => {
  return (
    <div className="hidden lg:block text-white bg-slate-500 py-1 px-4">
      <div className="container mx-auto">
        <div className="flex gap-2 flex-wrap flex-row lg:justify-between justify-center items-center text-sm">
          <div className="flex flex-row justify-center items-center gap-5">
            <div className="flex flex-row gap-[5px] justify-center items-center">
              <FaPhoneAlt size={11} />
              <p>01329747922</p>
            </div>
            <div className="flex flex-row gap-[5px] justify-center items-center">
              <HiOutlineMail size={15} />
              <p>sunwingsdev@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-[5px]">
            <MdLocationOn size={14} />
            <p className="text-center">
              Ai Nannu Tower North Kalshi Road House No #115 Near By Mirpur DOHS
              Shoping Complex
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
