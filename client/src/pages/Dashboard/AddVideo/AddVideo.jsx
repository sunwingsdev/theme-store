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
      console.log(videoId);
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
    try {
      setLoading(true);
      const result = await addVideo(data);
      if (result.data.insertedId) {
        addToast("Link added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
        reset();
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
            className="flex items-center justify-center gap-2"
          >
            {/* thumbnail Link */}
            <div className="w-2/5">
              <TextInput
                name={"thumbnail"}
                label={"Thumbnail Link"}
                register={register}
              />
              {errors.thumbnail && (
                <span className="text-red-600 text-sm">
                  {errors.thumbnail.message}
                </span>
              )}
            </div>
            {/* video Link */}
            <div className="w-2/5">
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
              className="disabled:bg-slate-500 w-1/5 disabled:text-slate-900 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
