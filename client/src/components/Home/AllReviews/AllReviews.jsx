import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useGetReviewsQuery } from "../../../redux/features/allApis/reviewsApi/reviewsApi";

const ReviewCard = ({ name, location, rating, review }) => {
  // Function to generate star rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? true : false;
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
        <div className="flex items-center space-x-1 text-sm">{renderStars()}</div>
      </div>
      <p className="text-gray-700">{review}</p>
    </div>
  );
};

const AllReviews = () => {
  const { data: reviews } = useGetReviewsQuery();

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex space-x-4">
          {reviews?.slice(0, 5).map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              location={review.location}
              rating={review.rating}
              review={review.review}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
