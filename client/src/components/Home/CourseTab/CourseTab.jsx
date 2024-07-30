import { useState } from "react";
import CourseCard from "../PopularCourse/CourseCard";
import { useGetAllCourseQuery } from "../../../redux/features/allApis/coursesApi/coursesApi";
import { Tab } from "@headlessui/react";
import Loader from "../../shared/Loader";

export default function CourseTab() {
  const { data, isLoading } = useGetAllCourseQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryOptions = [
    {
      label: "All",
      value: "",
    },
    {
      label: "News",
      value: "news",
    },
    {
      label: "Ecommerce",
      value: "e-commerce",
    },
  ];

  if (isLoading) return <Loader />;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = selectedCategory
    ? data?.filter((course) => course.category === selectedCategory)
    : data;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group
        onChange={(index) => {
          setSelectedCategory(categoryOptions[index].value);
          setCurrentPage(1);
        }}
      >
        <Tab.List className="flex gap-4 bg-red-500">
          {categoryOptions.map(({ label, value }) => (
            <Tab
              key={value}
              className="rounded-full py-1 px-3 text-sm font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categoryOptions.map((_, index) => (
            <Tab.Panel
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 py-10"
            >
              {currentItems?.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
