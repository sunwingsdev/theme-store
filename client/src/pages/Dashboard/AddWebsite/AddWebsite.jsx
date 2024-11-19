import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import TextInput from "../../../components/shared/TextInput";
import SelectInput from "../../../components/shared/SelectInput";
import { useAddWebsiteMutation } from "../../../redux/features/allApis/websitesApi/websitesApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for React Quill
import { useGetCategoriesQuery } from "../../../redux/features/allApis/categoryApi/categoryApi";
import { useGetTechnologiesQuery } from "../../../redux/features/allApis/technologyApi/technologyApi";

const AddWebsite = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: categoryOptions, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const { data: technologyOptions, isLoading: technologyLoading } =
    useGetTechnologiesQuery();
  const [addWebsite] = useAddWebsiteMutation();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [zipfile, setZipfile] = useState(null);
  const [modules, setModules] = useState([]);
  const [moduleInput, setModuleInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(""); // React Quill content
  const { addToast } = useToasts();

  const handleModuleInputChange = (e) => {
    setModuleInput(e.target.value);
  };

  const addModule = () => {
    if (moduleInput.trim() !== "") {
      setModules([...modules, moduleInput]);
      setModuleInput("");
    }
  };

  const removeModule = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("technology", data.technology);
    formData.append("tutorialLink", data.tutorialLink);
    formData.append("demoFrontend", data.demoFrontend);
    formData.append("demoBackend", data.demoBackend);
    formData.append("singleLicensePrice", data.singleLicensePrice);
    formData.append("unlimitedLicensePrice", data.unlimitedLicensePrice);
    formData.append("details", details);
    // Append each module individually
    modules.forEach((module) => formData.append("features[]", module));

    if (image) formData.append("image", image);
    if (zipfile) formData.append("file", zipfile);

    try {
      setLoading(true);
      const result = await addWebsite(formData);
      if (result.data.insertedId) {
        addToast("Website added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
        setImage(null);
        setImagePreview(null);
        setZipfile(null);
        setLoading(false);
      }
    } catch (error) {
      addToast("Failed to add website", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:w-4/5  flex items-center justify-center py-12 px-4 sm:px-6 w-full lg:px-8">
      <div className="w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-6">
          Add New Website
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

            {/* Other Inputs */}
            <SelectInput
              name={"category"}
              label={"Category"}
              options={categoryOptions}
              register={register}
              loading={categoryLoading}
            />
            <SelectInput
              name={"technology"}
              label={"Technology"}
              options={technologyOptions}
              register={register}
              loading={technologyLoading}
            />
            <TextInput name={"title"} label={"Title"} register={register} />
            <TextInput
              name={"tutorialLink"}
              label={"Tutorial Link"}
              register={register}
            />
            <TextInput
              name={"demoFrontend"}
              label={"Demo Frontend Link"}
              register={register}
            />
            <TextInput
              name={"demoBackend"}
              label={"Demo Backend Link"}
              register={register}
            />
            <TextInput
              name={"singleLicensePrice"}
              label={"Single License Price"}
              register={register}
            />
            <TextInput
              name={"unlimitedLicensePrice"}
              label={"Unlimited License Price"}
              register={register}
            />

            <div>
              <div className="w-full">
                <label
                  htmlFor="features"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Add Features
                  <div className="relative">
                    <input
                      type="text"
                      value={moduleInput}
                      onChange={handleModuleInputChange}
                      placeholder="Add Features "
                      className="w-full h-10 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 py-1.5 px-3 text-white bg-orange-600 rounded"
                      onClick={addModule}
                    >
                      +
                    </button>
                  </div>
                </label>
              </div>
              <ul className="mt-2">
                {modules?.map((module, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-blue-gray-50 rounded p-2 mb-2 text-sm text-blue-gray-900"
                  >
                    {module}
                    <button
                      type="button"
                      onClick={() => removeModule(index)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* React Quill for Details */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Details
              </label>
              <ReactQuill
                value={details}
                onChange={setDetails}
                className="bg-white"
                modules={{
                  toolbar: [
                    // Header and Font
                    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
                    // Text Formatting
                    ["bold", "italic", "underline", "strike"],
                    // List, Indent, Align
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    [{ align: [] }],
                    // Colors and Background
                    [{ color: [] }, { background: [] }],
                    // Blockquote, Code Block
                    ["blockquote", "code-block"],
                    // Links and Images
                    ["link", "image", "video"],
                    // Clean formatting
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "align",
                  "color",
                  "background",
                  "link",
                  "image",
                  "video",
                  "code-block",
                ]}
              />
              {errors.details && (
                <span className="text-red-600 text-sm">
                  {errors.details.message}
                </span>
              )}
            </div>

            {/* Zip File Upload */}
            <div className="flex flex-col justify-center md:col-span-2">
              <label
                htmlFor="dropzone-zipfile"
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
                    ZIP file
                  </p>
                </div>
                <input
                  id="dropzone-zipfile"
                  type="file"
                  accept=".zip"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setZipfile(file);
                  }}
                  className="hidden"
                />
              </label>
              {zipfile && (
                <div className="mt-2 flex justify-between items-center text-blue-gray-900 bg-blue-gray-50 p-2 rounded">
                  <span>{zipfile.name}</span>
                  <button
                    type="button"
                    onClick={() => setZipfile(null)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Adding Website..." : "Add Website"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWebsite;
