import { IoIosArrowDown } from "react-icons/io";

const PrimaryButton = ({ text, arrow, icon: Icon, spin }) => {
  return (
    <button
      className={`gradientBg flex flex-row items-center justify-center gap-2 rounded-lg text-white px-[19px] py-[13px]`}
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
