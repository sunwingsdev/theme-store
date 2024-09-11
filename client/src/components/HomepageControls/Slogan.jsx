import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import ColorPicker from "./ColorPicker";
import {
  useAddHomeControlMutation,
  useGetAllHomeControlsQuery,
} from "../../redux/features/allApis/homeControlApi/homeControlApi";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import SpinLoader from "../shared/SpinLoader";

const Slogan = () => {
  const { data: controls, isLoading } = useGetAllHomeControlsQuery();
  const [addHomeControl] = useAddHomeControlMutation();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm();
  const { addToast } = useToasts();

  const sloganControl = controls?.find(
    (control) => control.subcategory === "slogan"
  );

  console.log(sloganControl);

  const onSubmit = async (data) => {
    data.category = "banner";
    data.subcategory = "slogan";

    try {
      setLoading(true);
      const result = await addHomeControl(data);
      if (result.data.insertedId) {
        addToast("Slogan added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
        setLoading(false);
      }
    } catch (error) {
      addToast("Failed to add slogan", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 ">
      <div className="relative">
        {/* Edit Button */}
        <button
          className="absolute top-12 z-10 right-2 bg-blue-500 text-white py-1 px-3 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          onClick={() => alert("Edit Slogan Clicked")}
        >
          Edit
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg p-4 bg-white rounded shadow relative"
        >
          <h1 className="text-xl font-semibold mb-6 text-gray-900">
            Customize Your Homepage Slogan
          </h1>
          <TextInput
            name="text"
            control={control}
            label="Slogan Text"
            fontSize="text-base"
            backgroundColor="bg-gray-50"
            placeholder="Enter your slogan"
            required
          />
          <TextInput
            name="fontSize"
            control={control}
            label="Font Size"
            fontSize="text"
            backgroundColor="bg-gray-50"
            placeholder="Enter your font size"
            required
          />
          <ColorPicker name="textColor" control={control} label="Text Color" />
          <ColorPicker
            name="backgroundColor"
            control={control}
            label="Background Color"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-1.5 mt-3 disabled:bg-slate-500 disabled:text-black bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            {loading ? <SpinLoader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Slogan;
