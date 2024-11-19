import { useForm } from "react-hook-form";
import {
  useAddHomeControlMutation,
  useUpdateHomeControlMutation,
  useGetAllHomeControlsQuery,
} from "../../redux/features/allApis/homeControlApi/homeControlApi";
import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import SpinLoader from "../shared/SpinLoader";
import TextInput from "../HomepageControls/TextInput";
import ColorPicker from "../HomepageControls/ColorPicker";

const ControlCard = ({ name, page, category }) => {
  const { data: controls } = useGetAllHomeControlsQuery();
  const [addHomeControl] = useAddHomeControlMutation();
  const [updateHomeControl] = useUpdateHomeControlMutation(); 
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { control, handleSubmit, reset, setValue } = useForm();
  const { addToast } = useToasts();

  const selectedControl = controls?.find(
    (control) => control.subcategory === name
  );
  // Set form default values when selectedControl exists
  useEffect(() => {
    if (selectedControl) {
      setValue("text", selectedControl.text);
      setValue("fontSize", selectedControl.fontSize);
      setValue("textColor", selectedControl.textColor);
      setValue("backgroundColor", selectedControl?.backgroundColor);
    }
  }, [selectedControl, setValue]);

  const onSubmit = async (data) => {
    data.category = category;
    data.subcategory = name;
    data.page = page;

    try {
      setLoading(true);

      if (selectedControl) {
        // Update existing slogan
        const result = await updateHomeControl({
          id: selectedControl?._id,
          data,
        });

        if (result.data.modifiedCount > 0) {
          addToast(`${name} updated successfully`, {
            appearance: "success",
            autoDismiss: true,
          });
          setIsEditMode(false);
        }
      } else {
        // Add new slogan
        const result = await addHomeControl(data);
        if (result.data.insertedId) {
          addToast(`${name} added successfully`, {
            appearance: "success",
            autoDismiss: true,
          });
          reset();
        }
      }
      setLoading(false);
    } catch (error) {
      addToast(`Failed to submit ${name}`, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-2">
        <div className="relative">
          {/* Edit Button, shown only if selectedControl exists */}
          {selectedControl && !isEditMode && (
            <button
              className="absolute top-12 z-10 right-4 bg-orange-600 text-white py-1 px-3 rounded shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </button>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg p-4 bg-white rounded shadow relative"
          >
            <h1 className="text-lg font-semibold mb-4 text-gray-900">
              Customize Your <span className="capitalize">{page}</span>page{" "}
              <span className="capitalize">{category}</span>{" "}
              <span className="capitalize">{name}</span>
            </h1>
            <TextInput
              name="text"
              control={control}
              label="Text"
              fontSize="text-base"
              backgroundColor="bg-gray-50"
              placeholder={`Enter your ${name}`}
              required
              readOnly={selectedControl && !isEditMode}
            />
            <TextInput
              name="fontSize"
              control={control}
              label="Font Size"
              fontSize="text"
              backgroundColor="bg-gray-50"
              placeholder="Enter your font size (number)"
              required
              readOnly={selectedControl && !isEditMode}
            />
            <ColorPicker
              name="textColor"
              control={control}
              label="Text Color"
              disabled={selectedControl && !isEditMode}
            />
            <ColorPicker
              name="backgroundColor"
              control={control}
              label="Background Color"
              disabled={selectedControl && !isEditMode}
            />
            {(!selectedControl || isEditMode) && (
              <button
                type="submit"
                disabled={loading || (selectedControl && !isEditMode)}
                className="w-full py-1.5 mt-3 disabled:bg-slate-500 disabled:text-black bg-orange-600 text-white font-semibold rounded shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {loading ? <SpinLoader /> : isEditMode ? "Update" : "Submit"}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ControlCard;
