import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../apis/api";
import { useAddCourseMutation } from "../../../redux/features/allApis/coursesApi/coursesApi";
import { useToasts } from "react-toast-notifications";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addCourse] = useAddCourseMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const [courseImage, setCourseImage] = useState(null);
  const [modules, setModules] = useState([]);
  const [moduleInput, setModuleInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    try {
      setLoading(true);
      const imageData = await imageUpload(courseImage);
      const imageUrl = imageData?.data?.display_url;
      data.courseImage = imageUrl;
      data.modules = modules;
      try {
        const result = await addCourse(data);
        if (result.data.insertedId) {
          addToast("Course added successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          setLoading(false);
          reset();
        }
      } catch (error) {
        addToast("Failed to add course", {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-4/5 bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-6">
          Add New Course
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Image */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Course Preview"
                  className="max-h-[300px] mx-auto"
                />
              </div>
            )}
          </div>

          {/* Course Name */}
          <div className="relative w-full h-10">
            <input
              {...register("courseName", {
                required: "Course Name is required",
              })}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-orange-600 before:border-blue-gray-200 peer-focus:before:!border-blue-600 after:border-blue-gray-200 peer-focus:after:!border-blue-600">
              Course Name
            </label>
            {errors.courseName && (
              <span className="text-red-600 text-sm">
                {errors.courseName.message}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="relative w-full h-10">
            <textarea
              {...register("details", { required: "Details are required" })}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
              placeholder=" "
              rows="3"
            ></textarea>
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-orange-600 before:border-blue-gray-200 peer-focus:before:!border-blue-600 after:border-blue-gray-200 peer-focus:after:!border-blue-600">
              Details
            </label>
            {errors.details && (
              <span className="text-red-600 text-sm">
                {errors.details.message}
              </span>
            )}
          </div>

          {/* Modules */}
          <div className="relative w-full">
            <input
              type="text"
              value={moduleInput}
              onChange={handleModuleInputChange}
              placeholder="Enter Module"
              className="w-full h-10 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
            />

            <button
              type="button"
              onClick={addModule}
              className="absolute inset-y-0 right-0 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-r-md"
            >
              Add
            </button>
          </div>
          <div>
            {modules.map((module, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>{module}</span>
                <button
                  type="button"
                  onClick={() => removeModule(index)}
                  className="text-sm text-red-500 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Online Price */}
          <div className="relative w-full h-10">
            <input
              {...register("onlinePrice", {
                required: "Online Price is required",
              })}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-orange-600 before:border-blue-gray-200 peer-focus:before:!border-blue-600 after:border-blue-gray-200 peer-focus:after:!border-blue-600">
              Online Price
            </label>
            {errors.onlinePrice && (
              <span className="text-red-600 text-sm">
                {errors.onlinePrice.message}
              </span>
            )}
          </div>

          {/* Offline Price */}
          <div className="relative w-full h-10">
            <input
              {...register("offlinePrice", {
                required: "Offline Price is required",
              })}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-orange-600 before:border-blue-gray-200 peer-focus:before:!border-blue-600 after:border-blue-gray-200 peer-focus:after:!border-blue-600">
              Offline Price
            </label>
            {errors.offlinePrice && (
              <span className="text-red-600 text-sm">
                {errors.offlinePrice.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
