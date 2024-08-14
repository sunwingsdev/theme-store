import { TiEyeOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const SingleCourseCard = () => {
  return (
    <div>
      <div className="flex group rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <div className="w-80 overflow-hidden">
          <img
            className="group-hover:scale-105 duration-300"
            src="https://www.creativeitinstitute.com/images/course/course_1663052056.jpg"
            alt=""
          />
        </div>
        <div className="p-4">
          <div className="flex gap-3">
            <h2 className="text-[#1f1e1e] text-[20px] font-bold">
              Visa Processing Course
            </h2>
            <div className="flex items-center gap-2">
              <Link>
                <div className="p-1 text-xl hover:bg-slate-300 hover:text-blue-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                  <TiEyeOutline />
                </div>
              </Link>
              <Link>
                <div className="p-1 text-xl hover:bg-slate-300 hover:text-blue-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                  <TbEdit />
                </div>
              </Link>
              <Link>
                <div className="p-1 text-xl hover:bg-red-600 hover:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                  <MdOutlineDeleteOutline />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between py-2 text-[#787a82] text-[14px]">
            <p>680 Review</p>
            <p>850 Students</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 py-2 xl:text-base md:text-sm text-xs">
            <div className="">
              <p className="text-[#434242] font-bold">Online: 1800 BDT</p>
              <p className="text-[#434242] font-bold">Offline: 1200 BDT</p>
            </div>
            <button
              className="border border-[#ff7e31] p-[8px] font-semibold
         rounded-[8px] hover:bg-[#ff7e31] text-[#8c0000] hover:text-white"
            >
              Admission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseCard;
