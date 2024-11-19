import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { useGetAllHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const NavbarTop = () => {
  const { data: controls } = useGetAllHomeControlsQuery();
  const navTopEmail = controls?.find(
    (control) =>
      control.category === "navbar-top" && control.subcategory === "email"
  );

  const navTopNumber = controls?.find(
    (control) =>
      control.category === "navbar-top" && control.subcategory === "number"
  );
  const navTopAddress = controls?.find(
    (control) =>
      control.category === "navbar-top" && control.subcategory === "address"
  );

  return (
    <div className="hidden lg:block text-white bg-slate-500 py-1 px-4">
      <div className="container mx-auto">
        <div className="flex gap-2 flex-wrap flex-row lg:justify-between justify-center items-center text-sm">
          <div className="flex flex-row justify-center items-center gap-5">
            <div className="flex flex-row gap-[5px] justify-center items-center">
              <FaPhoneAlt size={11} />
              <p>{navTopNumber ? navTopNumber?.text : "01329747922"}</p>
            </div>
            <div className="flex flex-row gap-[5px] justify-center items-center">
              <HiOutlineMail size={15} />
              <p>{navTopEmail ? navTopEmail?.text : "sunwingsdev@gmail.com"}</p>
            </div>
          </div>
          <div className="flex gap-[5px]">
            <MdLocationOn size={14} />
            <p className="text-center">
              {navTopAddress
                ? navTopAddress?.text
                : "Ai Nannu Tower North Kalshi Road House No #115 Near By Mirpur DOHS Shoping Complex"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
