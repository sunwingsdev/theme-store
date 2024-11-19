import { useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import {
  useAddControlLogoMutation,
  useGetControlLogosQuery,
} from "../../redux/features/allApis/controlLogoApi/controlLogoApi";
import Loader from "../shared/Loader";

const LogoUpload = () => {
  const { data: controlLogos, isLoading } = useGetControlLogosQuery();
  const [addControlLogo] = useAddControlLogoMutation();
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const fileInputRef = useRef(null);

  const bannerLogo = controlLogos?.find(
    (logo) => logo.subcategory === "banner-logo"
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!logo) {
      addToast("Please upload a logo.", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("page", "home");
    formData.append("subcategory", "banner-logo");
    formData.append("image", logo);

    try {
      setLoading(true);
      const result = await addControlLogo(formData);
      if (result?.data?.insertedId) {
        addToast("Logo uploaded successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
        setLogo(null);
        setLogoPreview(null);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="w-full md:w-1/2">
          <form onSubmit={onSubmit} className="p-2 mx-auto space-y-3">
            {/* Logo Upload */}
            <div className="flex flex-row justify-between items-center gap-2 space-y-1 md:col-span-2">
              <div className="flex flex-col w-full">
                <p>Logo *</p>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
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
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
              </div>
              {logoPreview && (
                <div className="mt-2 relative w-1/2">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="max-h-[200px] mx-auto"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute top-1 right-1 text-red-600 bg-white rounded-full p-1"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="disabled:bg-slate-500 inline-flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {loading ? "Uploading logo..." : "Upload Logo"}
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={bannerLogo?.logo}
            alt="Logo Preview"
            className="w-full rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default LogoUpload;
