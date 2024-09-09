import { useContext, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { IoCheckmarkCircle, IoCopyOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AuthContext } from "../../../providers/AuthProviders";
import Loader from "../../../components/shared/Loader";
import { useAddOrderMutation } from "../../../redux/features/allApis/ordersApi/ordersApi";
import bkashLogo from "../../../assets/logo/bkash.png";
import rocketLogo from "../../../assets/logo/rocket.png";
import nagadLogo from "../../../assets/logo/nagad.png";

const paymentMethods = [
  {
    id: "bkash",
    title: "bKash",
    logo: bkashLogo,
    number: "01329747923",
    code: "*247#",
    className: "bg-[#E3106D]",
  },
  {
    id: "rocket",
    title: "Rocket",
    logo: rocketLogo,
    number: "01329747924",
    code: "*322#",
    className: "bg-[#8C3494]",
  },
  {
    id: "nagad",
    title: "Nagad",
    logo: nagadLogo,
    number: "01329747925",
    code: "*167#",
    className: "bg-[#EC3B41]",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Checkout = () => {
  const { user, loading } = useContext(AuthContext);
  const [addOrder] = useAddOrderMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { licenseType, price, title, websiteId, zipFile } =
    location.state || {};
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isNumberRevealed, setIsNumberRevealed] = useState(false);
  const { addToast } = useToasts();

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(selectedPaymentMethod.number);
    setIsNumberRevealed(true);
    addToast(`Number copied: ${selectedPaymentMethod.number}`, {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const handleSubmit = async () => {
    if (!transactionId || !number) {
      addToast("Please provide valid details", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      const orderInfo = {
        name: user.displayName,
        email: user.email,
        licenseType,
        price,
        title,
        websiteId,
        zipFile,
        paymentMethod: selectedPaymentMethod.title,
        transactionId,
        number,
      };

      try {
        setIsLoading(true);
        const result = await addOrder(orderInfo);
        if (result.data.insertedId) {
          addToast("Order placed successfully!", {
            appearance: "success",
            autoDismiss: true,
          });
          
          // Navigate to OrderSuccess page with order details
          navigate("/order-success", { state: { orderDetails: orderInfo } });
        }
      } catch (error) {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
        });
        setIsLoading(false);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto bg-white shadow sm:rounded-lg">
        <div className="p-1 sm:p-3 lg:p-5">
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Theme</p>
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
                    <p className="font-medium text-gray-900">{price} ৳</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
                <RadioGroup
                  value={selectedPaymentMethod}
                  onChange={(method) => {
                    setSelectedPaymentMethod(method);
                    setIsNumberRevealed(false);
                  }}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">Choose a payment method</RadioGroup.Label>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <RadioGroup.Option
                        key={method.id}
                        value={method}
                        className={({ active, checked }) =>
                          classNames(
                            active ? "ring-2 ring-indigo-500" : "",
                            checked
                              ? `${method.className} text-white`
                              : "bg-white",
                            "relative rounded-lg shadow-sm px-5 py-4 cursor-pointer flex focus:outline-none"
                          )
                        }
                      >
                        {({ checked }) => (
                          <div className="flex items-center justify-between w-full">
                            <RadioGroup.Label as="p" className="font-medium text-lg">
                              <div className="flex items-center gap-2">
                                <img className="w-10 h-10 rounded-lg" src={method.logo} alt={method.title} />
                                <p>{method.title}</p>
                              </div>
                            </RadioGroup.Label>
                            {checked && (
                              <IoCheckmarkCircle className="h-6 w-6 text-white" aria-hidden="true" />
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
              <div
                className={`lg:col-span-1 mt-6 lg:mt-0 p-6 border rounded-lg ${selectedPaymentMethod?.className} text-white`}
              >
                <h4 className="text-md font-semibold mb-2">Payment Instructions</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    Dial <span className="font-bold">{selectedPaymentMethod.code}</span> or open the{" "}
                    <span className="font-bold">{selectedPaymentMethod.title} app</span>.
                  </li>
                  <li>Choose &apos;Send Money&apos;.</li>
                  <li>
                    Enter the receiver&apos;s account number:{" "}
                    <span className="font-bold">
                      {isNumberRevealed
                        ? selectedPaymentMethod.number
                        : "013********"}
                    </span>
                    <button
                      onClick={handleCopyNumber}
                      className="ml-2 text-sm bg-gray-200 p-1 text-black rounded hover:bg-gray-300"
                    >
                      <IoCopyOutline className="inline-block mr-1" /> Copy
                    </button>
                  </li>
                  <li>
                    Enter the amount: <span className="font-bold">{price} ৳</span>.
                  </li>
                  <li>Confirm with your PIN.</li>
                  <li>
                    You will receive a confirmation message from{" "}
                    <span className="font-bold">{selectedPaymentMethod.title}</span>.
                  </li>
                  <li>Enter the transaction ID below to complete your purchase.</li>
                </ul>
                <div className="mt-4">
                  <label htmlFor="transaction-id" className="block text-sm font-medium">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    id="transaction-id"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="mt-1 block text-black p-3 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter your transaction ID"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="number" className="block text-sm font-medium">
                    Your Phone Number
                  </label>
                  <input
                    type="text"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="mt-1 block text-black p-3 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
