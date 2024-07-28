import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProviders";
import { useToasts } from "react-toast-notifications";
import loginImg from "../../../assets/login.jpg";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signIn(data.email, data.password);
      addToast("Logged in successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      navigate(from, { replace: true });
      setLoading(false);
    } catch (error) {
      addToast("Failed to log in", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 container mx-auto">
      <div className="w-full md:w-2/5">
        <img src={loginImg} alt="" className="w-full" />
      </div>
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 md:w-3/5">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
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
              className="block text-gray-700 font-bold mb-2"
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
          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Logging in" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
