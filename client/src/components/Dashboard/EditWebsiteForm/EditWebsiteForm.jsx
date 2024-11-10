import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import {
  useEditWebsiteMutation,
  useGetAllWebsitesQuery,
} from "../../../redux/features/allApis/websitesApi/websitesApi";
import TextInput from "../../shared/TextInput";
import SelectInput from "../../shared/SelectInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for React Quill
import Loader from "../../shared/Loader";

const EditWebsiteForm = ({ id, closeModal }) => {
  const { data: websites, isLoading } = useGetAllWebsitesQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [editWebsite] = useEditWebsiteMutation();
  const [image, setImage] = useState(null);
  const [modules, setModules] = useState([]);
  const [moduleInput, setModuleInput] = useState("");
  const [details, setDetails] = useState("");
  const [zipfile, setZipfile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const selectedWebsite = websites?.find((website) => website._id === id);
  console.log(selectedWebsite);

  const categoryOptions = [
    { label: "News", value: "news" },
    { label: "Ecommerce", value: "e-commerce" },
  ];

  const technologyOptions = [
    { label: "React", value: "react" },
    { label: "Laravel", value: "laravel" },
    { label: "Wordpress", value: "wordpress" },
  ];

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
    formData.append("id", id);
    // Append each module individually
    modules.forEach((module) => formData.append("features[]", module));

    if (image) formData.append("image", image);
    if (zipfile) formData.append("file", zipfile);

    try {
      setLoading(true);
      const result = await editWebsite(formData);
      if (result.data.modifiedCount > 0) {
        addToast("Website edited successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
        setImagePreview(null);
        closeModal();
        setLoading(false);
      }
    } catch (error) {
      addToast("Failed to edit website", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) <Loader />;

  return (
    <div className=" bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white p-8 shadow-lg rounded-lg">
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
              {imagePreview ? (
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
                    className="absolute top-1 right-1 text-red-600 bg-white rounded-full p-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="w-1/2 mt-2">
                  <img
                    src={selectedWebsite?.image}
                    alt="image preview"
                    className="max-h-[200px] mx-auto"
                  />
                </div>
              )}
            </div>

            {/* Other Inputs */}
            <SelectInput
              name={"category"}
              label={"Category"}
              options={categoryOptions}
              register={register}
            />
            <SelectInput
              name={"technology"}
              label={"Technology"}
              options={technologyOptions}
              register={register}
            />
            <TextInput
              name={"title"}
              label={"Title"}
              register={register}
              defaultValue={selectedWebsite?.title}
            />
            <TextInput
              name={"tutorialLink"}
              label={"Tutorial Link"}
              register={register}
              defaultValue={selectedWebsite?.tutorialLink}
            />
            <TextInput
              name={"demoFrontend"}
              label={"Demo Frontend Link"}
              register={register}
              defaultValue={selectedWebsite?.demoFrontend}
            />
            <TextInput
              name={"demoBackend"}
              label={"Demo Backend Link"}
              register={register}
              defaultValue={selectedWebsite?.demoBackend}
            />
            <TextInput
              name={"singleLicensePrice"}
              label={"Single License Price"}
              register={register}
              defaultValue={selectedWebsite?.singleLicensePrice}
            />
            <TextInput
              name={"unlimitedLicensePrice"}
              label={"Unlimited License Price"}
              register={register}
              defaultValue={selectedWebsite?.unlimitedLicensePrice}
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
                {modules.length > 0
                  ? modules.map((module, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-blue-gray-50 rounded p-2 text-sm text-blue-gray-900"
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
                    ))
                  : selectedWebsite?.features?.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center justify-between bg-blue-gray-50 rounded p-2 text-sm text-blue-gray-900"
                      >
                        {feature}
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
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ color: [] }],
                    [{ align: [] }],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
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
                <div className="mt-2 flex justify-between items-center text-blue-gray-900 bg-blue-50 p-2 rounded">
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
              {loading ? "Editing Website..." : "Edit Website"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWebsiteForm;
