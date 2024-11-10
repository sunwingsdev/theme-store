import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { FaCirclePlay } from "react-icons/fa6";
import TextInput from "../shared/TextInput";
import Modal from "../shared/Modal";
import {
  useAddControlVideoMutation,
  useGetControlVideosQuery,
} from "../../redux/features/allApis/controlVideoApi/controlVideoApi";
import Loader from "../shared/Loader";

const BannerVideo = () => {
  const { data: controlVideos, isLoading } = useGetControlVideosQuery();
  const [addControlVideo] = useAddControlVideoMutation();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  const bannerVideo = controlVideos?.find(
    (video) => video.subcategory === "banner-video"
  );

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("page", "home");
    formData.append("subcategory", "banner-video");
    formData.append("videoLink", data?.videoLink);
    if (image) formData.append("image", image);
    try {
      setLoading(true);
      const result = await addControlVideo(formData);
      if (result.data.insertedId) {
        addToast("Control Video Link added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
        reset();
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="p-2 mx-auto space-y-3"
          >
            {/* Image Upload */}
            <div
              className={`flex flex-row justify-between items-center gap-2 space-y-1 md:col-span-2`}
            >
              <div
                className={`flex flex-col w-full ${imagePreview && "w-1/2"}`}
              >
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImage(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {errors.image && (
                  <span className="text-red-600 text-sm">
                    {errors.image.message}
                  </span>
                )}
              </div>
              {imagePreview && (
                <div
                  className={`mt-2 w-1/2 relative ${!imagePreview && "hidden"}`}
                >
                  <img
                    src={imagePreview}
                    alt="image preview"
                    className="max-h-[200px] mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-1 right-1 text-red-600 bg-white rounded-full p-1"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            {/* video Link */}
            <div className="">
              <TextInput
                name={"videoLink"}
                label={"Video Link"}
                register={register}
              />
              {errors.videoLink && (
                <span className="text-red-600 text-sm">
                  {errors.videoLink.message}
                </span>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="disabled:bg-slate-500 disabled:text-slate-900 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? "Adding link..." : "Add link"}
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
              <FaCirclePlay
                onClick={openModal}
                className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer"
              />
            </div>
            <img
              src={bannerVideo?.image}
              alt="Gallery Image"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="w-full h-96">
          <iframe
            className="w-full h-full rounded-lg"
            src={bannerVideo?.videoLink?.replace(
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

export default BannerVideo;