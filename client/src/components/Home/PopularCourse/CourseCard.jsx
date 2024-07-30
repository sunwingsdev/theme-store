import { useState } from "react";
import Modal from "../../shared/Modal";
import AdmissionForm from "../AdmissionForm/AdmissionForm";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState("");

  const openModal = (course) => {
    setIsOpen(true);
    setCourseName(course);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col bg-slate-100 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
        <Link>
          <img
            className="rounded-t-lg w-full md:h-60"
            src={course?.image}
            alt=""
          />
        </Link>
        <div className="p-4 space-y-1">
          <Link>
            <h2 className="text-[#1f1e1e] text-[20px] font-bold mt-2 capitalize">
              {course?.title}
            </h2>
          </Link>
          <p className="text-[#4b4b50] text-base font-medium">
            Single License: $40 / {course?.singleLicensePrice} BDT
          </p>
          <p className="text-[#4b4b50] text-base font-medium">
            Unlimited : $40 / {course?.unlimitedLicensePrice} BDT
          </p>
          <div className="py-2 text-right text-[#6d6e76] text-[14px]">
            <p>680 Review</p>
          </div>
          <div className="flex gap-4 flex-row items-center justify-between xl:text-base md:text-sm text-xs">
            <Link
              to={course?.demoLink}
              rel="noreferrer"
              target={"_blank"}
              // onClick={() => openModal(course?.courseName)}
              className="text-center border w-full border-red-600 p-[8px] font-semibold
         rounded-sm hover:bg-red-600 text-red-600 hover:text-white transition-all duration-300"
            >
              Live Demo
            </Link>
            <Link
              to={`/single-website-details/${course?._id}`}
              className="text-center border w-full border-black p-[8px] font-semibold
         rounded-sm hover:bg-black text-black hover:text-white transition-all duration-700"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <AdmissionForm closeModal={closeModal} course={courseName} />
      </Modal>
    </>
  );
};

export default CourseCard;
