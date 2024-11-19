import { useForm } from "react-hook-form";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../../redux/features/allApis/categoryApi/categoryApi";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import {
  useAddTechnologyMutation,
  useGetTechnologiesQuery,
  useDeleteTechnologyMutation,
} from "../../../redux/features/allApis/technologyApi/technologyApi";
import { FaTrash } from "react-icons/fa";

const AddCategory = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch: categoryRefetch,
  } = useGetCategoriesQuery();
  const {
    data: technologies,
    isLoading: isTechnologiesLoading,
    refetch: techRefetch,
  } = useGetTechnologiesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addTechnology] = useAddTechnologyMutation();
  const [deleteTechnology] = useDeleteTechnologyMutation();
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [technologyLoading, setTechnologyLoading] = useState(false);
  const { addToast } = useToasts();

  // Separate form instances for each form
  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    reset: resetCategory,
  } = useForm();

  const {
    register: registerTechnology,
    handleSubmit: handleSubmitTechnology,
    reset: resetTechnology,
  } = useForm();

  const onSubmitCategory = async (data) => {
    try {
      setCategoryLoading(true);
      const result = await addCategory(data);
      if (result.data?.insertedId) {
        addToast("Category added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        resetCategory();
        categoryRefetch();
      }
    } catch (error) {
      addToast("Failed to add category", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setCategoryLoading(false);
    }
  };

  const onSubmitTechnology = async (data) => {
    try {
      setTechnologyLoading(true);
      const result = await addTechnology(data);
      if (result.data?.insertedId) {
        addToast("Technology added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        resetTechnology();
        techRefetch();
      }
    } catch (error) {
      addToast("Failed to add technology", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setTechnologyLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const result = await deleteCategory(id);
      if (result.data.deletedCount > 0) {
        addToast("Category deleted successfully", {
          appearance: "info",
          autoDismiss: true,
        });
        categoryRefetch();
      }
    } catch (error) {
      addToast("Failed to delete category", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleDeleteTechnology = async (id) => {
    try {
      const result = await deleteTechnology(id);
      if (result.data.deletedCount > 0) {
        addToast("Technology deleted successfully", {
          appearance: "info",
          autoDismiss: true,
        });
        techRefetch();
      }
    } catch (error) {
      addToast("Failed to delete technology", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Category Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Category
          </h2>
          <form
            onSubmit={handleSubmitCategory(onSubmitCategory)}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label
              </label>
              <input
                type="text"
                {...registerCategory("label", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category label"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              <input
                type="text"
                {...registerCategory("value", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category value"
              />
            </div>
            <button
              disabled={categoryLoading}
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              {categoryLoading ? "Adding category..." : "Add Category"}
            </button>
          </form>

          {/* Display Categories */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Existing Categories
            </h3>
            {isCategoriesLoading ? (
              <p>Loading categories...</p>
            ) : (
              <div className="space-y-4">
                {categories?.length !== 0 ? (
                  categories?.map((category) => (
                    <div
                      key={category._id}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
                    >
                      <div>
                        <p className="text-gray-800 font-medium">
                          {category.label}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Value: {category.value}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No categories</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add Technology Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Technology
          </h2>
          <form
            onSubmit={handleSubmitTechnology(onSubmitTechnology)}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label
              </label>
              <input
                type="text"
                {...registerTechnology("label", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter label for technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              <input
                type="text"
                {...registerTechnology("value", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter value for technology"
              />
            </div>
            <button
              disabled={technologyLoading}
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
            >
              {technologyLoading ? "Adding technology..." : "Add Technology"}
            </button>
          </form>

          {/* Display Technologies */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Existing Technologies
            </h3>
            {isTechnologiesLoading ? (
              <p>Loading technologies...</p>
            ) : (
              <div className="space-y-4">
                {technologies?.length !== 0 ? (
                  technologies?.map((technology) => (
                    <div
                      key={technology._id}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm"
                    >
                      <div>
                        <p className="text-gray-800 font-medium">
                          {technology.label}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Value: {technology.value}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteTechnology(technology._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No technologies</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
