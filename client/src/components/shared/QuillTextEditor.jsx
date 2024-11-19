import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SpinLoader from "./SpinLoader";
import {
  useAddHomeControlMutation,
  useGetAllHomeControlsQuery,
  useUpdateHomeControlMutation,
} from "../../redux/features/allApis/homeControlApi/homeControlApi";

const QuillTextEditor = ({ category, name, page }) => {
  const { data: controls } = useGetAllHomeControlsQuery();
  const [addHomeControl] = useAddHomeControlMutation();
  const [updateHomeControl] = useUpdateHomeControlMutation();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { handleSubmit, reset, setValue, watch } = useForm();
  const { addToast } = useToasts();

  const aboutData = controls?.find((control) => control.subcategory === name);

  useEffect(() => {
    if (aboutData?.text) {
      setValue("text", aboutData.text);
    }
  }, [aboutData, setValue]);

  const onSubmit = async (data) => {
    data.category = category;
    data.subcategory = name;
    data.page = page;

    try {
      setLoading(true);
      if (aboutData) {
        const result = await updateHomeControl({
          id: aboutData?._id,
          data,
        });
        if (result?.data?.modifiedCount > 0) {
          addToast("About updated successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          setIsEditMode(false);
        }
      } else {
        const result = await addHomeControl(data);
        if (result?.data?.insertedId) {
          addToast("About added successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          reset();
        }
      }
      setLoading(false);
    } catch (error) {
      addToast("Failed to save about", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const textValue = watch("text");

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"], // Clear formatting
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="flex items-center justify-center p-2">
      <div className="relative">
        {aboutData && !isEditMode && (
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
          <ReactQuill
            value={textValue || ""}
            onChange={(value) => setValue("text", value)}
            placeholder="Write a description..."
            readOnly={aboutData && !isEditMode}
            className={`mb-4 ${
              aboutData && !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            modules={modules}
            formats={formats}
          />
          {(!aboutData || isEditMode) && (
            <button
              type="submit"
              disabled={loading}
              className="w-full py-1.5 mt-3 disabled:bg-slate-500 disabled:text-black bg-orange-600 text-white font-semibold rounded shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              {loading ? <SpinLoader /> : isEditMode ? "Update" : "Submit"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuillTextEditor;
