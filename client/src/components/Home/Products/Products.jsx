import { useState } from "react";
import { Tab } from "@headlessui/react";
import Loader from "../../shared/Loader";
import ProductCard from "./ProductCard";
import { useGetAllWebsitesQuery } from "../../../redux/features/allApis/websitesApi/websitesApi";
import { useGetCategoriesQuery } from "../../../redux/features/allApis/categoryApi/categoryApi";

export default function Products() {
  const { data, isLoading } = useGetAllWebsitesQuery();
  const { data: categoryOptions, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("");

  if (isLoading || categoryLoading) return <Loader />;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (categoryValue) => {
    setSelectedCategory(categoryValue);
    setCurrentPage(1);
  };

  // Normalize category comparison for filtering
  const filteredData = selectedCategory
    ? data?.filter((item) => {
        return (
          item.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()
        );
      })
    : data;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  return (
    <div className="container mx-auto">
      <div className="w-full px-2 py-10 pb-20 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex items-center justify-center gap-4 overflow-x-auto py-2 px-10">
            <Tab
              onClick={() => handleCategorySelect("")}
              className={`${
                selectedCategory === ""
                  ? "bg-black text-white"
                  : "text-gray-800 hover:text-white hover:bg-black hover:border-gray-800"
              } border rounded-full py-2 px-6 text-base font-semibold focus:outline-none transition-all duration-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
            >
              All
            </Tab>
            {categoryOptions?.length ? (
              categoryOptions.map(({ _id, categoryLabel, categoryValue }) => (
                <Tab
                  key={_id}
                  onClick={() => handleCategorySelect(categoryValue)}
                  className={`${
                    selectedCategory === categoryValue
                      ? "bg-black text-white"
                      : "text-gray-800 hover:text-white hover:bg-black hover:border-gray-800"
                  } border rounded-full py-2 px-6 text-base font-semibold focus:outline-none transition-all duration-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                >
                  {categoryLabel}
                </Tab>
              ))
            ) : (
              <div>...</div>
            )}
          </Tab.List>
        </Tab.Group>

        {/* Directly render filtered items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 py-10">
          {currentItems?.length ? (
            currentItems.map((website) => (
              <ProductCard key={website._id} website={website} />
            ))
          ) : (
            <div className="flex items-center justify-center col-span-full py-20">
              <p className="text-center font-semibold text-lg">
                No Products found in this category
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 border rounded ${
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
    </div>
  );
}
