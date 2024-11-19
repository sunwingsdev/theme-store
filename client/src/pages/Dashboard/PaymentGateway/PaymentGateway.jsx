import { Switch } from "@headlessui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useAddPaymentMethodMutation,
  useGetPaymentMethodsQuery,
  useUpdatePaymentMethodStatusMutation,
} from "../../../redux/features/allApis/paymentMethodsApi/paymentMethodsApi";
import { useToasts } from "react-toast-notifications";

const PaymentMethod = () => {
  const {
    data: paymentMethods,
    isLoading: isLoadingPaymentMethods,
    refetch,
  } = useGetPaymentMethodsQuery();
  const [addPaymentMethod] = useAddPaymentMethodMutation();
  const [updatePaymentMethodStatus] = useUpdatePaymentMethodStatusMutation();
  const { register, handleSubmit, control, setValue, watch, reset } = useForm({
    defaultValues: {
      title: "",
      image: null,
      instructions: "",
      inputs: [],
    },
  });
  const { addToast } = useToasts();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputs",
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }
    formData.append("instructions", data.instructions);
    data.inputs.forEach((input, index) => {
      formData.append(`inputs[${index}][label]`, input.label);
      formData.append(`inputs[${index}][type]`, input.type);
      formData.append(`inputs[${index}][value]`, input.value || "");
    });

    try {
      const result = await addPaymentMethod(formData);
      if (result.data.insertedId) {
        addToast("Payment Method added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
      }
    } catch (error) {
      console.error(error.message);
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleUpdateStatus = async (method) => {
    try {
      const updatedStatus = !method.isActive;
      const result = await updatePaymentMethodStatus({
        id: method._id,
        isActive: updatedStatus,
      });
      if (result.data.modifiedCount > 0) {
        addToast(
          `Payment Method ${
            updatedStatus ? "activated" : "deactivated"
          } successfully`,
          { appearance: "success", autoDismiss: true }
        );
        refetch();
      }
    } catch (error) {
      addToast("Failed to update payment method status", {
        appearance: "error",
        autoDismiss: true,
      });
      refetch();
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "direction",
    "color",
    "background",
    "script",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="max-w-screen-lg w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add Payment Method
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Name
          </label>
          <input
            type="text"
            {...register("title", { required: "Payment name is required" })}
            placeholder="Enter payment name"
            className="block w-full px-4 py-2 border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method Image
          </label>
          <input
            type="file"
            {...register("image")}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-black file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Instructions
          </label>
          <ReactQuill
            value={watch("instructions")}
            onChange={(value) => setValue("instructions", value)}
            modules={modules}
            formats={formats}
            className="bg-white rounded-lg"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Input fields for User data
          </h3>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border border-gray-200 rounded-lg space-y-4 flex flex-col md:flex-row md:space-y-0 md:space-x-4"
              >
                {/* Input Label */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Input Label
                  </label>
                  <input
                    type="text"
                    {...register(`inputs.${index}.label`, {
                      required: "Label is required",
                    })}
                    placeholder="Enter label name"
                    className="block w-full px-4 py-2 border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Input Value */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Input Value
                  </label>
                  <input
                    type="text"
                    {...register(`inputs.${index}.value`, {
                      required: "Value is required",
                    })}
                    placeholder="Enter value for this input"
                    className="block w-full px-4 py-2 border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Input Type */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Input Type
                  </label>
                  <select
                    {...register(`inputs.${index}.type`, {
                      required: "Type is required",
                    })}
                    className="block w-full px-4 py-2 border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="text">Text</option>
                    <option value="file">File</option>
                  </select>
                </div>

                {/* Remove Button */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="py-2 px-4 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Remove Input
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ label: "", type: "text" })}
            className="mt-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {fields.length ? "Add More Input Field" : "Add Input Field"}
          </button>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Add Payment Method
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Payment Methods
        </h2>
        {isLoadingPaymentMethods ? (
          <p>Loading payment methods...</p>
        ) : (
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Name</th>
                <th className="border border-black px-4 py-2">Status</th>
                <th className="border border-black px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods?.map((method) => (
                <tr key={method._id}>
                  <td className="border border-black px-4 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={method.image}
                        alt={method.title}
                        className="w-12 h-12 rounded"
                      />
                      <span className="font-medium">{method.title}</span>
                    </div>
                  </td>

                  <td className="border border-black px-4 py-2">
                    <Switch
                      checked={method.isActive}
                      onChange={() => handleUpdateStatus(method)}
                      className={`${
                        method.isActive ? "bg-green-500" : "bg-gray-500"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                    >
                      <span
                        className={`${
                          method.isActive ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </td>

                  <td className="border border-black px-4 py-2">
                    <button
                      onClick={() => {
                        // Handle delete functionality here
                      }}
                      className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
