import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const PrimaryButton = ({ control, text, arrow, icon: Icon, spin }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        fontSize: `${control?.fontSize}px`,
        backgroundColor: isHovered ? "#F97316" : control?.backgroundColor, // Change background on hover
        color: control?.textColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-gray-700 text-white flex flex-row items-center justify-center gap-2 rounded-lg px-8 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all duration-500`}
    >
      {Icon && (
        <Icon size={25} className={`${spin && "animate-spin"} font-semibold`} />
      )}
      <p className="text-[18px] font-semibold">
        {control?.text ? control?.text : text}
      </p>
      {arrow && <IoIosArrowDown />}
    </button>
  );
};

export default PrimaryButton;
