import { useState } from "react";
import Modal from "../../shared/Modal";
import AdmissionForm from "../AdmissionForm/AdmissionForm";

const CourseCard = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col  justify-center bg-white shadow-md rounded-lg">
        <img className="rounded-t-lg" src={course?.image} alt="" />
        <div className="p-3">
          <h2 className="text-[#1f1e1e] text-[20px] font-bold py-3">
            {course?.courseName}
          </h2>
          <div className="flex flex-row items-center justify-between py-2 text-[#787a82] text-[14px]">
            <p>680 Review</p>
            <p>850 Students</p>
          </div>
          <div className="flex flex-row items-center justify-between py-2 xl:text-base md:text-sm text-xs">
            <p className="text-[#434242] font-bold">
              Online: {course?.onlinePrice} BDT
            </p>
            <p className="text-[#434242] font-bold">
              Offline: {course?.offlinePrice} BDT
            </p>
            <button
              onClick={openModal}
              className="border border-[#ff7e31] p-[8px] font-semibold
         rounded-[8px] hover:bg-[#ff7e31] text-[#8c0000] hover:text-white"
            >
              Admission
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <AdmissionForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default CourseCard;
