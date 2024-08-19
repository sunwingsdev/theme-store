import { useState } from "react";
import TextInput from "../../shared/TextInput";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { imageUpload } from "../../../apis/api";
import {
  useEditCourseMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/allApis/coursesApi/coursesApi";
import Loader from "../../shared/Loader";

export const EditCourseForm = ({ id, closeModal }) => {
  const { data: courses, isLoading } = useGetAllCourseQuery();
  const [editCourse] = useEditCourseMutation();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();
  const selectedCourse = courses?.find((course) => course._id === id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const imageData = await imageUpload(image);
      const imageUrl = imageData?.url;
      data.image = imageUrl || selectedCourse?.image;
      try {
        const result = await editCourse({ id, data });
        if (result.data.modifiedCount > 0) {
          addToast("Course edited successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          setLoading(false);
          reset();
          setImagePreview(null);
          closeModal();
        }
      } catch (error) {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} action="">
        {/* image */}
        <div className="flex flex-col space-y-1 md:col-span-2">
          <p>Image *</p>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {imagePreview ? (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="image preview"
                className="max-h-[300px] mx-auto"
              />
            </div>
          ) : (
            <div className="mt-2">
              <img
                src={selectedCourse?.image}
                alt="image preview"
                className="max-h-[300px] mx-auto"
              />
            </div>
          )}
        </div>
        {/* Course Name */}
        <TextInput
          name={"courseName"}
          label={"Course Name"}
          register={register}
          defaultValue={selectedCourse?.courseName}
        />
        {errors.courseName && (
          <span className="text-red-600 text-sm">
            {errors.courseName.message}
          </span>
        )}

        {/* Online Price */}
        <TextInput
          name={"onlinePrice"}
          label={"Online Price"}
          register={register}
          defaultValue={selectedCourse?.onlinePrice}
        />
        {errors.onlinePrice && (
          <span className="text-red-600 text-sm">
            {errors.onlinePrice.message}
          </span>
        )}

        {/* Offline Price */}
        <TextInput
          name={"offlinePrice"}
          label={"Offline Price"}
          register={register}
          defaultValue={selectedCourse?.offlinePrice}
        />
        {errors.offlinePrice && (
          <span className="text-red-600 text-sm">
            {errors.offlinePrice.message}
          </span>
        )}

        {/* Duration */}
        <TextInput
          name={"duration"}
          label={"Duration"}
          register={register}
          defaultValue={selectedCourse?.duration}
        />
        {errors.duration && (
          <span className="text-red-600 text-sm">
            {errors.duration.message}
          </span>
        )}

        {/* Class Schedule */}
        <TextInput
          name={"classSchedule"}
          label={"Class Schedule"}
          register={register}
          defaultValue={selectedCourse?.classSchedule}
        />
        {errors.classSchedule && (
          <span className="text-red-600 text-sm">
            {errors.classSchedule.message}
          </span>
        )}

        <button
          disabled={loading}
          type="submit"
          className="mt-6 w-full disabled:bg-slate-500 disabled:text-slate-900 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? "Editing..." : "Edit Website"}
        </button>
      </form>
    </div>
  );
};