import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddReviewMutation,
  useGetReviewsQuery,
} from "../../../redux/features/allApis/reviewsApi/reviewsApi";
import { useToasts } from "react-toast-notifications";
import SpinLoader from "../../../components/shared/SpinLoader";

const AddReview = () => {
  const { data: reviews, isLoading } = useGetReviewsQuery();
  const [addReview] = useAddReviewMutation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(0);
  const { addToast } = useToasts();

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // Define how many reviews you want to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(reviews?.length / reviewsPerPage);

  // Get current reviews for pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await addReview(data);
      if (result.data.insertedId) {
        addToast("Review added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
      }
    } catch (error) {
      addToast("Failed to add Review", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setValue("rating", selectedRating);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen gap-10 bg-gray-50 p-4">
      {/* Left: Review Form */}
      <div className="w-full  max-w-lg p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-3">
          Add Your Review
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className={`w-full px-2 py-1.5 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Location Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              className={`w-full px-2 py-1.5 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Star Rating Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-3xl focus:outline-none transition-colors duration-200 ${
                    rating >= star ? "text-orange-500" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <input
              type="hidden"
              {...register("rating", { required: "Rating is required" })}
            />
            {errors.rating && (
              <p className="mt-1 text-sm text-red-500">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Review Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              className={`w-full px-2 py-1.5 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.review ? "border-orange-500" : "border-gray-300"
              }`}
              rows="5"
              {...register("review", { required: "Review is required" })}
            ></textarea>
            {errors.review && (
              <p className="mt-1 text-sm text-red-500">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 disabled:bg-slate-500 disabled:text-black text-white py-2 rounded shadow-sm hover:bg-orange-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {loading ? <SpinLoader /> : "Add Review"}
            </button>
          </div>
        </form>
      </div>

      {/* Right: Review List with Pagination */}
      {!isLoading ? (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Customer Reviews
          </h2>
          <div className="space-y-2">
            {currentReviews?.map((review, index) => (
              <div
                key={index}
                className="p-2 border-b border-gray-200 last:border-none"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{review.location}</p>
                <div className="flex space-x-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        review.rating >= star
                          ? "text-orange-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">{review.review}</p>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              className={`px-4 py-2 rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-all ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-all ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddReview;
