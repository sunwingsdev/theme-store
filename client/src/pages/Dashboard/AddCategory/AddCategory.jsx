import { useForm } from "react-hook-form";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../../../redux/features/allApis/categoryApi/categoryApi";
import { useAddSubcategoryMutation } from "../../../redux/features/allApis/subcategoryApi/subcategoryApi";
import { useToasts } from "react-toast-notifications";
import loading from "../../../../public/assets/loading.json";
import { useState } from "react";

const AddCategory = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [setsubcategoryLoading, setSetsubcategoryLoading] = useState(false);
  const [addSubcategory] = useAddSubcategoryMutation();
  const { addToast } = useToasts();

  // Separate form instances for each form
  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    reset: resetCategory,
  } = useForm();

  const {
    register: registerSubcategory,
    handleSubmit: handleSubmitSubcategory,
    reset: resetSubcategory,
  } = useForm();

  const onSubmitCategory = async (data) => {
    console.log("Category Data: ", data);

    try {
      setCategoryLoading(true);
      const result = await addCategory(data);
      if (result.data.insertedId) {
        addToast("Category added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setCategoryLoading(false);
        resetCategory(); // Optional: Reset the form after submission
      }
    } catch (error) {
      addToast("Failed to add category", {
        appearance: "error",
        autoDismiss: true,
      });
      setCategoryLoading(false);
    }
  };

  const onSubmitSubcategory = async (data) => {
    console.log("Subcategory Data: ", data);
    try {
      setSetsubcategoryLoading(true);
      const result = await addSubcategory(data);
      if (result.data.insertedId) {
        addToast("Subcategory added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        resetSubcategory(); // Optional: Reset the form after submission
        setsubcategoryLoading(false);
      }
    } catch (error) {
      addToast("Failed to add subcategory", {
        appearance: "error",
        autoDismiss: true,
      });
      setsubcategoryLoading(false);
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
                {...registerCategory("categoryLabel", { required: true })}
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
                {...registerCategory("categoryValue", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category value"
              />
            </div>
            <button
              disabled={categoryLoading}
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              {categoryLoading
                ? `Adding category ${loading}...`
                : "Add Category"}
            </button>
          </form>
        </div>

        {/* Add Subcategory Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Subcategory
          </h2>
          <form
            onSubmit={handleSubmitSubcategory(onSubmitSubcategory)}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Category
              </label>
              <select
                {...registerSubcategory("category", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a category</option>
                {/* Add dynamic options here */}
                {categories?.length !== 0 ? (
                  categories?.map(({ _id, categoryValue, categoryLabel }) => (
                    <option key={_id} value={categoryValue}>
                      {categoryLabel}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label
              </label>
              <input
                type="text"
                {...registerSubcategory("subcategoryLabel", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter subcategory label"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              <input
                type="text"
                {...registerSubcategory("subcategoryValue", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter subcategory value"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
            >
              Add Subcategory
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
