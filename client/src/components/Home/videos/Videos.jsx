import { FaCirclePlay } from "react-icons/fa6";
import Modal from "../../shared/Modal";
import { useState } from "react";
import { useGetVideosQuery } from "../../../redux/features/allApis/videosApi/videosApi";
import Loader from "../../shared/Loader";

const Videos = () => {
  const { data: videos, isLoading } = useGetVideosQuery();
  const [isOpen, setIsOpen] = useState(false);

  const selectedVideos = videos?.filter((video) => video.isSelected === true);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="relative container mx-auto my-10 px-4">
        <div className="text-3xl font-bold py-10">Things that you can see</div>
        <div className="">
          {selectedVideos?.length !== 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {selectedVideos?.map((video) => (
                <div key={video._id} className="relative">
                  <div
                    onClick={openModal}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8"
                  >
                    <FaCirclePlay className="text-4xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer" />
                  </div>
                  <img
                    src={video?.thumbnail}
                    alt="A thumbnail of video"
                    className="w-full rounded"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center my-4">No videos found</div>
          )}
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className="w-full h-96">
            <iframe
              className="w-full h-full rounded-lg"
              src={selectedVideos[0]?.videoLink.replace(
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
    </>
  );
};

export default Videos;
