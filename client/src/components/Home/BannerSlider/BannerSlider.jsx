import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrPrevious, GrNext } from "react-icons/gr";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <GrPrevious
      className={`${className} absolute top-1/2 transform -translate-y-1/2 lg:-left-10 md:-left-8 sm:-left-6 -left-4`}
      style={{
        ...style,
        padding: "3px",
        width: "35px",
        height: "35px",
        zIndex: 10,
        background: "white",
        color: isHovered ? "white" : "rgba(0, 0, 0, 0.3)",
        border: "1px solid #ff1e1e",
        borderRadius: "50%",
        transition: "background-color 0.3s",
        backgroundColor: isHovered ? "red" : "transparent",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <GrNext
      className={`${className} absolute top-1/2 transform -translate-y-1/2 lg:-right-10 md:-right-8 sm:-right-6 -right-4`}
      style={{
        ...style,
        padding: "3px",
        width: "35px",
        height: "35px",
        zIndex: 10,
        background: "white",
        color: isHovered ? "white" : "rgba(0, 0, 0, 0.3)",
        border: "1px solid #ff1e1e",
        borderRadius: "50%",
        transition: "background-color 0.3s",
        backgroundColor: isHovered ? "red" : "transparent",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

const BannerSlider = () => {
  const slideList = [
    {
      image: "https://www.creativeitinstitute.com/images/department/ve.png",
      title: "Film & Media",
      link: "",
    },
    {
      image: "https://www.creativeitinstitute.com/images/department/lg.png",
      title: "English Language",
      link: "",
    },
    {
      image: "https://www.creativeitinstitute.com/images/department/robot.png",
      title: "Robotics & Automation",
      link: "",
    },
    {
      image: "https://www.creativeitinstitute.com/images/department/aws.png",
      title: "Cloud Computing",
      link: "",
    },
    {
      image: "https://www.creativeitinstitute.com/images/department/gd.png",
      title: "Graphic & Multimedia",
      link: "",
    },
    {
      image: "https://www.creativeitinstitute.com/images/department/wd.png",
      title: "Web & Software",
      link: "",
    },
    {
      image: "https://www.creativeitinstitute.com/images/department/dm.png",
      title: "Digital Marketing",
      link: "",
    },
    {
      image: "https://www.creativeitinstitute.com/images/department/cy.png",
      title: "Cyber Security",
      link: "",
    },
    {
      image: "https://www.creativeitinstitute.com/images/department/net.png",
      title: "Networking & Technology",
      link: "",
    },
  ];

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 6,
    swipeToSlide: true,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-8 w-full absolute bottom-[-90px] left-1/2 transform -translate-x-1/2">
      <div className="slider-container w-full px-4 relative">
        <Slider {...settings}>
          {slideList.map((item, i) => (
            <div key={i} className="slide-item">
              <div className="flex flex-col bg-white p-[15px] rounded-2xl w-[135px] h-[150px] shadow-md items-center justify-center mx-6 my-3">
                <img
                  className="mx-auto w-[32px]"
                  src={item.image}
                  alt={item.title}
                />
                <h3 className="text-center pt-[16px] text-[#1f1e1e] text-[18px] font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlider;
