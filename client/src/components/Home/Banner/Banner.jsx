import { BsBookmarkCheckFill } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { FaCirclePlay } from "react-icons/fa6";
import isoImg from "../../../assets/banner/iso.png";
import BannerSlider from "../BannerSlider/BannerSlider";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../shared/Modal";
import { useGetAllHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";
import { useGetControlVideosQuery } from "../../../redux/features/allApis/controlVideoApi/controlVideoApi";

const Banner = () => {
  const { data: controls } = useGetAllHomeControlsQuery();
  const { data: controlVideos } = useGetControlVideosQuery();
  const [isOpen, setIsOpen] = useState(false);
  const sloganControl = controls?.find(
    (control) => control.subcategory === "slogan"
  );
  const titleControl = controls?.find(
    (control) => control.subcategory === "title"
  );
  const textControl = controls?.find(
    (control) => control.subcategory === "text"
  );
  const firstButtonControl = controls?.find(
    (control) => control.subcategory === "first-button"
  );
  const secondButtonControl = controls?.find(
    (control) => control.subcategory === "second-button"
  );

  const bannerVideo = controlVideos?.find(
    (video) => video.subcategory === "banner-video"
  );
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="bannerBg pt-14 pb-52 relative">
        <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-center gap-16 lg:gap-4">
          <div className="lg:w-1/2">
            <div className="flex flex-row gap-1 items-center justify-center md:justify-start ">
              <BsBookmarkCheckFill size={25} className="text-[#ff1e1e]" />
              <p
                style={{
                  fontSize: `${sloganControl?.fontSize}px`,
                  color: sloganControl?.textColor,
                  backgroundColor: sloganControl?.backgroundColor,
                }}
                className="text-[17px] font-semibold"
              >
                {sloganControl?.text
                  ? sloganControl?.text
                  : "Unleash your potential"}
              </p>
            </div>
            <h2
              style={{
                fontSize: `${titleControl?.fontSize}px`,
                color: titleControl?.textColor,
                backgroundColor: titleControl?.backgroundColor,
              }}
              className="text-[37px] font-bold text-center md:text-start"
            >
              {titleControl?.text
                ? titleControl?.text
                : "একজন দক্ষ বিজনেসম্যান হয়ে উঠুন এবং শাসন করুন ডিজিটাল ওয়ার্ল্ড"}
            </h2>
            <p
              style={{
                fontSize: `${textControl?.fontSize}px`,
                color: textControl?.textColor,
                backgroundColor: textControl?.backgroundColor,
              }}
              className="text-[#212529] py-4 text-center md:text-start"
            >
              {textControl?.text
                ? textControl?.text
                : "জনশক্তিকে সম্পদে পরিণত করার দৃষ্টিভঙ্গি নিয়ে, সানউইংস ট্রেনিং সেন্টার দক্ষ পরামর্শদাতা এবং আপডেট করা পাঠ্যক্রমের সাথে আপনার শেখার অভিজ্ঞতা বাড়াতে প্রস্তুত। ১০ টিরও বেশি ট্রেন্ডি বিকল্প থেকে আপনার পছন্দসই কোর্সটি বেছে নিন।"}
            </p>
            <div className="flex flex-row items-center justify-start gap-3">
              <Link to={"/courses"}>
                <PrimaryButton
                  control={firstButtonControl}
                  icon={IoBookOutline}
                  text={"Browse Course"}
                  arrow={false}
                  hover={true}
                >
                  Browse
                </PrimaryButton>
              </Link>
              <PrimaryButton
                control={secondButtonControl}
                icon={IoBookOutline}
                text={"Join Free Seminar"}
                arrow={false}
                hover={true}
              >
                Browse
              </PrimaryButton>
            </div>
            <div className="flex flex-row items-center justify-start gap-3 py-6">
              <img src={isoImg} alt="iso" />
              <p className="text-[#342b27] font-semibold">
                One of the best ISO certified IT <br /> Training Institutes in
                Bangladesh
              </p>
            </div>
          </div>
          <div className="relative lg:w-1/2">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
              <FaCirclePlay
                onClick={openModal}
                className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer"
              />
            </div>
            <img
              src={bannerVideo?.image}
              alt="Gallery Image"
              className="w-full rounded"
            />
          </div>
        </div>
        <BannerSlider />
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="w-full h-96">
          <iframe
            className="w-full h-full rounded-lg"
            src={bannerVideo?.videoLink.replace(
              "https://youtu.be/",
              "https://www.youtube.com/embed/"
            )}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          ></iframe>
        </div>
      </Modal>
    </>
  );
};

export default Banner;
