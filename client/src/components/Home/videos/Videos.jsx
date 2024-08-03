import { FaCirclePlay } from "react-icons/fa6";

const Videos = () => {
  return (
    <div className="pt-10 pb-28 relative">
      <div className="text-4xl font-bold text-center pb-10">All Video</div>
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-4">
        <div className="relative lg:w-1/2">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
            <FaCirclePlay className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer" />
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAWODtOXszjkqVWo_E4ss3pq8EzQ3PuFenQ&s"
            alt="Gallery Image"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="relative lg:w-1/2">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
            <FaCirclePlay className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer" />
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAWODtOXszjkqVWo_E4ss3pq8EzQ3PuFenQ&s"
            alt="Gallery Image"
            className="w-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Videos;
