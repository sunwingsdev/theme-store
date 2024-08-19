import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";

const DashboardCourseCard = ({
  course,
  handleOpenDeleteModal,
  handleOpenEditModal,
}) => {
  return (
    <div className="w-full">
      <div className="flex group rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <div className="w-2/5 overflow-hidden">
          <img
            className="group-hover:scale-105 duration-300 h-full"
            src={course.image}
            alt="Course Thumbnail"
          />
        </div>
        <div className="w-3/5 p-4">
          <div className="flex gap-3">
            <h2 className="text-[#1f1e1e] text-[20px] font-bold">
              {course.courseName}
            </h2>
            <div className="flex items-center gap-2">
              <div
                onClick={() => handleOpenEditModal(course._id)}
                className="p-1 text-xl hover:bg-slate-300 hover:text-blue-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
              >
                <TbEdit />
              </div>

              <div
                onClick={() => handleOpenDeleteModal(course._id)}
                className="p-1 text-xl hover:bg-red-600 hover:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
              >
                <MdOutlineDeleteOutline />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 py-2 xl:text-base md:text-sm text-xs">
            <div>
              <p className="text-[#434242] font-bold">
                Online: {course.onlinePrice} BDT
              </p>
              <p className="text-[#434242] font-bold">
                Offline: {course.offlinePrice} BDT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
