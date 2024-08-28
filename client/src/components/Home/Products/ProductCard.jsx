import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";

const ProductCard = ({ website }) => {
  // Generate random numbers between 1 and 999 for likes and hearts
  const randomHearts = Math.floor(Math.random() * (999 - 1 + 1)) + 1;
  const randomLikes = Math.floor(Math.random() * (99 - 1 + 1)) + 1;

  return (
    <>
      <div className="flex flex-col bg-slate-100 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] transition-all duration-300">
        <Link>
          <img
            className="rounded-t-lg w-full md:h-60"
            src={website?.image}
            alt=""
          />
        </Link>
        <div className="p-4 space-y-1">
          <Link>
            <h2 className="text-[#1f1e1e] text-[20px] font-bold mt-2 capitalize">
              {website?.title}
            </h2>
          </Link>
          <p className="text-[#4b4b50] text-base font-medium">
            Single License: {website?.singleLicensePrice} BDT
          </p>
          <p className="text-[#4b4b50] text-base font-medium">
            Unlimited : {website?.unlimitedLicensePrice} BDT
          </p>
          <div className="py-2 text-right text-[#6d6e76] text-[14px] flex justify-between">
            <div className="flex items-center justify-start gap-2">
              <FaHeart className="text-red-600 md:text-xl" />
              <span>({randomHearts}k+)</span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <AiOutlineLike className="text-red-600 md:text-xl" />
              <span>({randomLikes}k+)</span>
            </div>
          </div>
          <div className="flex gap-4 flex-row items-center justify-between xl:text-base md:text-sm text-xs">
            <Link
              to={website?.demoFrontend}
              rel="noreferrer"
              target={"_blank"}
              className="text-center border w-full border-red-600 p-[8px] font-semibold
         rounded-sm hover:bg-red-600 text-red-600 hover:text-white transition-all duration-300"
            >
              Live Demo
            </Link>
            <Link
              to={`/single-website-details/${website?._id}`}
              className="text-center border w-full border-black p-[8px] font-semibold
         rounded-sm hover:bg-black text-black hover:text-white transition-all duration-700"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
      {/* <Modal isOpen={isOpen} closeModal={closeModal}>
        <AdmissionForm closeModal={closeModal} course={courseName} />
      </Modal> */}
    </>
  );
};

export default ProductCard;
