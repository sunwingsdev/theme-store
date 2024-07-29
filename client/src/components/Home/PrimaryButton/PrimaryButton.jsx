import { IoIosArrowDown } from "react-icons/io";

const PrimaryButton = ({ text, arrow, icon: Icon, spin }) => {
  return (
    <button
      className={`bg-gray-700 hover:bg-orange-500 text-white flex flex-row items-center justify-center gap-2 rounded-lg px-8 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all duration-500`}
    >
      {Icon && (
        <Icon size={25} className={`${spin && "animate-spin"} font-semibold`} />
      )}
      <p className="text-[18px] font-semibold">{text}</p>
      {arrow && <IoIosArrowDown />}
    </button>
  );
};

export default PrimaryButton;
