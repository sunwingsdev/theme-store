import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

const NavbarTop = () => {
  return (
    <div className="text-white gradientBg py-3 px-4">
      <div className="container mx-auto flex gap-2 flex-wrap flex-row lg:justify-between justify-center items-center text-sm">
        <div className="flex flex-row justify-center items-center gap-12">
          <div className="flex flex-row gap-2 justify-center items-center">
            <FaPhoneAlt size={12} />
            <p>01329747927</p>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <HiOutlineMail size={16} />
            <p>sunwingsdev@gmail.com</p>
          </div>
        </div>
        <div className="flex gap-2">
          <MdLocationOn size={16}/>
          <p className="text-center">Ai Nannu Tower North Kalshi Road House No #115 Near By Mirpur DOHS Shoping Complex</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
