import { useForm } from "react-hook-form";
import TextInput from "../../../components/shared/TextInput";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  useAddVideoMutation,
  useDeleteVideoMutation,
  useGetVideosQuery,
  useUpdateVideoSelectionMutation,
} from "../../../redux/features/allApis/videosApi/videosApi";
import Loader from "../../../components/shared/Loader";
import Modal from "../../../components/shared/Modal";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteModal from "../../../components/shared/DeleteModal";

const AddVideo = () => {
  const { data: videos, isLoading } = useGetVideosQuery();
  const [addVideo] = useAddVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updateVideoSelection] = useUpdateVideoSelectionMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setId(id);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteVideo(id);
      if (result.data.deletedCount > 0) {
        addToast("Video deleted successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      setOpenDeleteModal(false);
      setId("");
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      console.log(error.message);
    }
  };

  const handleVideoClick = async (videoId, isChecked) => {
    try {
      //   Update isSelected status for the clicked video
      await updateVideoSelection({ id: videoId, isSelected: isChecked });
      if (isChecked) {
        addToast("Video selected successfully!", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast("Video de-selected successfully!", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("videoLink", data.videoLink);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const result = await addVideo(formData);
      if (result.data.insertedId) {
        addToast("Link added successfully", {
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
      <div className="w-full">
        <div className="my-8 p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="p-2 sm:w-4/5 md:w-3/5 mx-auto space-y-3"
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
        <div className="pt-10 pb-28">
          <div className="text-4xl font-bold text-center pb-10">All Videos</div>
          <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-4">
            {videos?.length !== 0 ? (
              videos?.map((video) => (
                <div key={video._id} className="relative lg:w-1/2">
                  <div
                    onClick={openModal}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8"
                  >
                    <FaCirclePlay className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer" />
                  </div>
                  <div className="flex absolute top-0 right-0 items-center gap-2 justify-between w-full px-2">
                    <input
                      type="checkbox"
                      checked={video?.isSelected}
                      onChange={(e) =>
                        handleVideoClick(video?._id, e.target.checked)
                      }
                      className="p-3 w-8 h-8 text-xl focus:ring-green-500 checked:bg-green-500"
                    />

                    <div
                      onClick={() => handleOpenDeleteModal(video._id)}
                      className="p-1 text-xl hover:bg-red-600 hover:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
                    >
                      <MdOutlineDeleteOutline />
                    </div>
                  </div>
                  <img
                    src={video?.thumbnail}
                    alt="A thumbnail of video"
                    className="w-full rounded-2xl"
                  />
                  <Modal isOpen={isOpen} closeModal={closeModal}>
                    <div className="w-full h-96">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={video?.videoLink.replace(
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
                </div>
              ))
            ) : (
              <div className="text-center my-4">No videos found</div>
            )}
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default AddVideo;
