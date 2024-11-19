import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "../../../redux/features/allApis/reviewsApi/reviewsApi";
import { useToasts } from "react-toast-notifications";
import SpinLoader from "../../../components/shared/SpinLoader";
import DeleteModal from "../../../components/shared/DeleteModal";

const AddReview = () => {
  const { data: reviews, isLoading } = useGetReviewsQuery();
  const [addReview] = useAddReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(0);
  const { addToast } = useToasts();

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const totalPages = Math.ceil(reviews?.length / reviewsPerPage);

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

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setId(id);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const result = await deleteReview(id);
      if (result.data.deletedCount > 0) {
        addToast("Review deleted successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setDeleteLoading(false);
        setOpenDeleteModal(false);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-4 py-8 px-6 md:px-12">
      {/* Left: Review Form */}
      <div className="w-full p-10 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Share Your Experience
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Location Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-3xl focus:outline-none transition-colors duration-200 ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.review ? "border-red-500" : "border-gray-300"
              }`}
              rows="4"
              {...register("review", { required: "Review is required" })}
            ></textarea>
            {errors.review && (
              <p className="mt-1 text-sm text-red-500">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 disabled:bg-slate-500 text-white py-3 rounded-lg shadow-sm hover:bg-orange-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {loading ? <SpinLoader /> : "Submit Review"}
            </button>
          </div>
        </form>
      </div>

      {/* Right: Review List with Pagination */}
      {!isLoading && reviews?.length > 0 && (
        <div className="w-full mt-10 md:mt-0 bg-white shadow-lg rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Customer Reviews
          </h2>
          <div className="space-y-8">
            {currentReviews?.map((review, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 relative"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{review.location}</p>
                <div className="flex space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        review.rating >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.review}</p>
                <button
                  onClick={() => handleOpenDeleteModal(review._id)}
                  className="absolute top-2 right-2 text-sm bg-red-500 px-2 py-1 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        handleDelete={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default AddReview;
