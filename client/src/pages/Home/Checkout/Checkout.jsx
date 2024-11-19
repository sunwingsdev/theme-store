import { useContext, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AuthContext } from "../../../providers/AuthProviders";
import Loader from "../../../components/shared/Loader";
import { useAddOrderMutation } from "../../../redux/features/allApis/ordersApi/ordersApi";
import { useGetPaymentMethodsQuery } from "../../../redux/features/allApis/paymentMethodsApi/paymentMethodsApi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Checkout = () => {
  const { data: paymentMethods, isLoading: paymentLoading } =
    useGetPaymentMethodsQuery();
  const { user, loading } = useContext(AuthContext);
  const [addOrder] = useAddOrderMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { licenseType, price, title, websiteId, zipFile } =
    location.state || {};
  const paymentMethodsOptions = paymentMethods?.filter(
    (paymentMethod) => paymentMethod.isActive === true
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethodsOptions?.length > 0 ? paymentMethodsOptions[0] : null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({});
  const { addToast } = useToasts();

  const handleInputChange = (label, value) => {
    setFormInputs((prev) => ({
      ...prev,
      [label]: value instanceof FileList ? value[0] : value,
    }));
  };

  const camelCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");

  const handleSubmit = async () => {
    if (!Object.values(formInputs).every((value) => value)) {
      addToast("Please provide all required details", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    const orderInfo = {
      name: user.displayName,
      email: user.email,
      licenseType: licenseType,
      price,
      title,
      websiteId,
      zipFile,
      paymentMethod: selectedPaymentMethod?.title,
    };

    const formData = new FormData();

    // Add static order details
    formData.append("name", user.displayName);
    formData.append("email", user.email);
    formData.append("licenseType", licenseType);
    formData.append("price", price);
    formData.append("title", title);
    formData.append("websiteId", websiteId);
    formData.append("zipFile", zipFile);
    formData.append("paymentMethod", selectedPaymentMethod?.title);

    // Construct array of inputs with camelCase keys
    const paymentInputsArray = selectedPaymentMethod.inputs
      .map((input) => {
        const camelCaseName = camelCase(input.label);
        const inputValue = formInputs[input.label];

        if (input.type === "file" && inputValue) {
          formData.append("image", inputValue);
          return null;
        } else {
          return {
            [camelCaseName]: inputValue || "",
          };
        }
      })
      .filter(Boolean);

    // Convert the array to JSON and append it
    formData.append("paymentInputs", JSON.stringify(paymentInputsArray));
    try {
      setIsLoading(true);
      const result = await addOrder(formData);

      if (result.data?.insertedId) {
        addToast("Order placed successfully!", {
          appearance: "success",
          autoDismiss: true,
        });
        navigate("/order-success", { state: { orderDetails: orderInfo } });
      }
    } catch (error) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoading(false);
    }
  };

  if (
    loading ||
    paymentLoading ||
    !paymentMethodsOptions ||
    paymentMethodsOptions.length === 0
  ) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto bg-white shadow sm:rounded-lg">
        <div className="p-1 sm:p-3 lg:p-5">
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h3>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Script</p>
                    <p className="font-medium text-gray-900">{title}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>License Type</p>
                    <p className="font-medium text-gray-900">
                      {licenseType === "single-license"
                        ? "Single License"
                        : "Unlimited License"}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <p>Price</p>
                    <p className="font-medium text-gray-900"> $ {price}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">
                  Payment Method
                </h3>
                <RadioGroup
                  value={selectedPaymentMethod}
                  onChange={(method) => {
                    setSelectedPaymentMethod(method); // Set the currently selected method
                    setFormInputs(() => {
                      const inputs = {};
                      method.inputs?.forEach((input) => {
                        inputs[input.label] = ""; // Reset form inputs for the new method
                      });
                      return inputs;
                    });
                  }}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a payment method
                  </RadioGroup.Label>
                  <div className="space-y-4">
                    {paymentMethodsOptions?.map((method) => (
                      <RadioGroup.Option
                        key={method.title}
                        value={method} // Ensures this method is tied to the `value` state
                        className={({ active, checked }) =>
                          classNames(
                            active ? "ring-2 ring-indigo-500" : "",
                            checked
                              ? "bg-indigo-500 text-white"
                              : "bg-white border-2 border-gray-300",
                            "relative rounded-lg shadow-sm px-5 py-4 cursor-pointer flex focus:outline-none"
                          )
                        }
                      >
                        {({ checked }) => (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <img
                                className="w-10 h-10 rounded-lg"
                                src={method.image}
                                alt={method.title}
                              />
                              <p
                                className={classNames(
                                  "font-medium text-lg",
                                  checked ? "text-white" : "text-gray-900"
                                )}
                              >
                                {method.title}
                              </p>
                            </div>
                            {checked && (
                              <IoCheckmarkCircle
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            {selectedPaymentMethod && (
              <div className="lg:col-span-1 mt-6 lg:mt-0 p-6 border rounded-lg bg-gray-50">
                <h4 className="text-md font-semibold mb-2">
                  Payment Instructions
                </h4>
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: selectedPaymentMethod.instructions,
                  }}
                ></div>

                {selectedPaymentMethod.inputs?.map((input) => (
                  <div className="mt-4" key={input.label}>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor={input.label}
                    >
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      id={input.label}
                      onChange={(e) =>
                        handleInputChange(
                          input.label,
                          input.type === "file"
                            ? e.target.files
                            : e.target.value
                        )
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? "Processing..." : "Complete Purchase"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
