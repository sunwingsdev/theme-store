import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../apis/api";
import { useAddCourseMutation } from "../../../redux/features/allApis/coursesApi/coursesApi";
import { useToasts } from "react-toast-notifications";
import TextInput from "../../../components/shared/TextInput";
import SelectInput from "../../../components/shared/SelectInput";
import TextareaInput from "../../../components/shared/TextareaInput";

const AddWebsite = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addCourse] = useAddCourseMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [modules, setModules] = useState([]);
  const [moduleInput, setModuleInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const categoryOptions = [
    {
      label: "News",
      value: "news",
    },
    {
      label: "Ecommerce",
      value: "e-commerce",
    },
  ];

  const technologyOptions = [
    {
      label: "React",
      value: "react",
    },
    {
      label: "Laravel",
      value: "laravel",
    },
    {
      label: "Wordpress",
      value: "wordpress",
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
      const imageData = await imageUpload(image);
      const imageUrl = imageData?.data?.display_url;
      data.image = imageUrl;
      data.features = modules;
      try {
        const result = await addCourse(data);
        if (result.data.insertedId) {
          addToast("Website added successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          setLoading(false);
          reset();
          setImagePreview(null);
        }
      } catch (error) {
        addToast("Failed to add website", {
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
          Add New Website
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* image */}
            <div className="flex flex-col space-y-1 md:col-span-2">
              <p>Image *</p>
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
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="image preview"
                    className="max-h-[300px] mx-auto"
                  />
                </div>
              )}
            </div>
            {/* Category */}
            <SelectInput
              name={"category"}
              label={"Category"}
              options={categoryOptions}
              register={register}
            />
            {errors.category && (
              <span className="text-red-600 text-sm">
                {errors.category.message}
              </span>
            )}
            {/* Technology */}
            <SelectInput
              name={"technology"}
              label={"Technology"}
              options={technologyOptions}
              register={register}
            />
            {errors.technology && (
              <span className="text-red-600 text-sm">
                {errors.technology.message}
              </span>
            )}
            {/* Title */}
            <TextInput name={"title"} label={"Title"} register={register} />
            {errors.title && (
              <span className="text-red-600 text-sm">
                {errors.title.message}
              </span>
            )}
            {/* Demo Link */}
            <TextInput
              name={"demoLink"}
              label={"Demo Link"}
              register={register}
            />
            {errors.demoLink && (
              <span className="text-red-600 text-sm">
                {errors.demoLink.message}
              </span>
            )}
            {/* Tutorial Link */}
            <TextInput
              name={"tutorialLink"}
              label={"Tutorial Link"}
              register={register}
            />
            {errors.tutorialLink && (
              <span className="text-red-600 text-sm">
                {errors.tutorialLink.message}
              </span>
            )}
            {/* Single License Price */}
            <TextInput
              name={"singleLicensePrice"}
              label={"Single License Price"}
              register={register}
            />
            {errors.singleLicensePrice && (
              <span className="text-red-600 text-sm">
                {errors.singleLicensePrice.message}
              </span>
            )}
            {/* Unlimited License Price */}
            <TextInput
              name={"unlimitedLicensePrice"}
              label={"Unlimited License Price"}
              register={register}
            />
            {errors.unlimitedLicensePrice && (
              <span className="text-red-600 text-sm">
                {errors.unlimitedLicensePrice.message}
              </span>
            )}

            {/* Features */}
            <div className="relative w-full">
              <input
                type="text"
                value={moduleInput}
                onChange={handleModuleInputChange}
                placeholder=" "
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
              />
              <label
                htmlFor="features"
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-orange-600 before:border-blue-gray-200 peer-focus:before:!border-blue-600 after:border-blue-gray-200 peer-focus:after:!border-blue-600"
              >
                Features
              </label>
              <button
                type="button"
                onClick={addModule}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center pr-2"
              >
                Add
              </button>
            </div>
            <div
              className={`space-y-2 py-3 ${modules.length === 0 && "hidden"}`}
            >
              {modules.map((module, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{module}</span>
                  <button
                    type="button"
                    onClick={() => removeModule(index)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Details */}
          <TextareaInput
            name={"details"}
            label={"Details"}
            register={register}
          />
          {errors.details && (
            <span className="text-red-600 text-sm">
              {errors.details.message}
            </span>
          )}
          <div className="text-center">
            <button
              disabled={loading}
              type="submit"
              className="mt-6 w-full disabled:bg-slate-500 disabled:text-slate-900 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? "Adding..." : "Add Website"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWebsite;
