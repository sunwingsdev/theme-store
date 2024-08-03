import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useGetAllCourseQuery } from "../../../redux/features/allApis/coursesApi/coursesApi";
import Heading from "../../../components/shared/Heading";

const WebsiteDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAllCourseQuery();

  const singleWebsite = data?.find((singleData) => singleData._id === id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="">
      {/* single website details page header area */}
      <Heading title={singleWebsite?.title} />
      {/* all single card */}
      <div className="container mx-auto">
        <div className="flex items-center justify-center mt-10 md:mt-16">
          <Link
            to={singleWebsite?.demoLink}
            rel="noreferrer"
            target={"_blank"}
            className="bg-white hover:bg-red-600 hover:text-white text-red-600 border border-red-600 rounded-full p-2 px-10 text-lg font-bold hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] transition-all duration-300"
          >
            Live Demo
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 md:py-14 lg:py-20 px-6 lg:px-10">
          {/* single card */}
          <div className="py-10 px-6 text-center bg-slate-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] transition-all duration-300 rounded">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold border-b-2 py-1 mb-6">
                Single License
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-[#3c3b3e]">
                $42.38 / {singleWebsite?.singleLicensePrice} ৳
              </h3>
              <p className="text-base">
                <span className="font-bold">One </span>Premium themes
              </p>
              <p>1 Year Updates</p>
              <p>One Domain Usage</p>
            </div>
            <button className="bg-slate-500 hover:bg-blue-700 text-white rounded-full w-[70%] p-2 text-lg font-bold mt-10 hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]  transition-all duration-300">
              Buy Now
            </button>
          </div>
          {/* single card */}
          <div className="py-10 px-6 text-center bg-slate-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] transition-all duration-300 rounded">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold border-b-2 py-1 mb-6">
                Unlimited License
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-[#3c3b3e]">
                $106 / {singleWebsite?.unlimitedLicensePrice} ৳
              </h3>
              <p className="text-base">
                <span className="font-bold">One </span>Premium themes
              </p>
              <p>1 Year Updates</p>
              <p>Unlimited Domain Usage</p>
            </div>
            <button className="bg-slate-500 hover:bg-blue-700 text-white rounded-full w-[70%] p-2 text-lg font-bold mt-10 hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]  transition-all duration-300">
              Buy Now
            </button>
          </div>
          {/* single card */}
          <div className="py-10 px-6 bg-gray-300 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold border-b-2 py-1 mb-4">
                Responsive
              </h2>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-bold">
                  <IoCheckmarkCircleOutline />{" "}
                </span>
                Responsive Design
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-bold">
                  <IoCheckmarkCircleOutline />{" "}
                </span>
                Responsive Navigation
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-bold">
                  <IoCheckmarkCircleOutline />{" "}
                </span>
                Responsive Editing
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-bold">
                  <IoCheckmarkCircleOutline />{" "}
                </span>
                Excellent layout
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-bold">
                  <IoCheckmarkCircleOutline />{" "}
                </span>
                Optimized for Faster Loading
              </p>
            </div>
          </div>
          {/* single card */}
          <div className="order-5 md:col-span-2 bg-slate-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-5 rounded">
            <img
              className="w-full"
              src="https://www.thecreativemomentum.com/hs-fs/hubfs/blog-files/2106%20blogs/2106-21-Marketing101WebHomepage-image-h2-1.jpg?width=600&name=2106-21-Marketing101WebHomepage-image-h2-1.jpg"
              alt=""
            />
          </div>
          {/* single card */}
          <div className="order-4 lg:order-6 py-10 px-6 bg-gray-300 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold border-b-2 py-1 mb-4">
                Website Details
              </h2>
              <p className="text-base flex gap-1 border-b">
                <span className="font-medium">Latest updated :</span>
                25 July 2023
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-medium">Created :</span>
                25 July 2023
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-medium">Documentation :</span>
                Well Documented
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-medium">Layout :</span>
                Responsive
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-medium">Widget Ready :</span>
                Yes
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-medium">Compatible Browsers :</span>
                IE11, Firefox, Safari, Opera, Chrome, Edge
              </p>
              <p className="text-base flex items-center gap-1 border-b">
                <span className="font-medium">Software Version :</span>
                React 6.4.1, React 6.4.2, React 6.4.3 ++
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetails;
