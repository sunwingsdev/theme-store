import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProviders";
import { useAddUserMutation } from "../../../redux/features/allApis/usersApi/UsersApi";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { createUser, updateUserProfile, user, setUser,  } =
    useContext(AuthContext);

  const [addUser] = useAddUserMutation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const createUserResult = await createUser(data.email, data.password);
      // Create FormData and append form fields
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("uid", createUserResult?.user?.uid);
      formData.append("password", data.password);
      // Append the profile picture to formData
      if (profilePicture) {
        formData.append("image", profilePicture);
      }

      // Send FormData to the backend
      const result = await addUser(formData);
      await updateUserProfile(data.name, result.data.image);
      setUser({ ...user, displayName: data.name, photoURL: result.data.image });
      if (result.data.insertedId) {
        addToast(`${data.name} registered successfully`, {
          appearance: "success",
          autoDismiss: true,
        });
      }
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
        <div className="w-full md:w-2/5 md:block hidden">
          <img
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1807.jpg"
            alt=""
            className="w-full"
          />
        </div>
        <div className="max-w-md mx-auto bg-white rounded px-8 pt-6 pb-8 md:w-3/5 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Regis<span className="text-orange-500">tration</span>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className="input border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="input border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", { required: true })}
                  className="input border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-2 mr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                  className="input border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-2 mr-3"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="profilePicture"
                className="block text-gray-700 font-semibold"
              >
                Profile Picture
              </label>
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="mt-2 max-w-xs rounded-lg shadow-md"
                />
              ) : (
                <div className="border-2 border-dashed border-gray-400 rounded p-4">
                  <label
                    htmlFor="profilePicture"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <span className="text-gray-600">Upload a file</span>
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-700 disabled:bg-slate-600 disabled:text-black text-white font-bold py-2 px-6 rounded"
                disabled={IsLoading}
              >
                {IsLoading ? "Loading..." : "Register"}
              </button>
              <Link
                to="/login"
                className="text-sm text-blue-500 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
