import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Slider from "react-slick";
import { useGetReviewsQuery } from "../../../redux/features/allApis/reviewsApi/reviewsApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ReviewCard component for displaying each review
const ReviewCard = ({ name, location, rating, review }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-500" />
        ))}
      </>
    );
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 flex-shrink-0 w-72">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg capitalize font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          {renderStars()}
        </div>
      </div>
      <p className="text-gray-700">{review}</p>
    </div>
  );
};

// Custom Arrow Components for slick slider
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 z-10 p-2 bg-gray-800 rounded-full text-white -translate-y-1/2 top-1/2 shadow-lg hover:bg-gray-600"
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 z-10 p-2 bg-gray-800 rounded-full text-white -translate-y-1/2 top-1/2 shadow-lg hover:bg-gray-600"
  >
    <FaChevronRight />
  </button>
);

const AllReviews = () => {
  const { data: reviews, isLoading } = useGetReviewsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "30px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
    ],
  };

  return (
    <>
      {" "}
      {!isLoading && reviews?.length ? (
        <div className="container mx-auto px-4 py-8 relative">
          {reviews && reviews.length > 0 ? (
            <Slider {...settings}>
              {reviews.map((review, index) => (
                <div key={index} className="flex justify-center mx-4">
                  <ReviewCard
                    name={review.name}
                    location={review.location}
                    rating={review.rating}
                    review={review.review}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-500">No reviews available.</p>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AllReviews;
