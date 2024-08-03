import CourseTab from "../../../components/Home/CourseTab/CourseTab";

const Product = () => {
  return (
    <div className="">
      <div className="bg-black relative h-[400px] lg:h-[500px]">
        <img
          className="w-full h-[400px] lg:h-[500px]"
          src="https://eunoiawebdesign.eu/wp-content/uploads/2019/02/web-design-for-tourism.jpg"
          alt=""
        />
        <div className="px-4 py-28 absolute top-0 bg-black opacity-80 w-full h-full"></div>
        <div className="px-4 py-28 absolute top-0 w-full h-full">
          <h2 className="text-orange-500 text-3xl md:text-4xl xl:text-5xl text-center font-bold">
            Best Websites Made For You
          </h2>
          <p className="text-[#fdfdfd] text-center w-2/3 mx-auto pt-2 pb-1">
            The Perfect Solution For any Online Presence, We have 100+ Premium
            Websites Project.
          </p>
          {/* search */}
          <form className="max-w-60 sm:max-w-xs lg:max-w-md mx-auto mt-6">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full px-4 py-2 sm:py-3 ps-10 text-base text-gray-900 rounded-lg bg-gray-50 focus:none focus:outline-none shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-0.5 sm:bottom-1.5 bg-orange-500 hover:bg-orange-500 focus:none focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="px-4">
          <CourseTab />
        </div>
      </div>
    </div>
  );
};

export default Product;
