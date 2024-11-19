import moment from "moment";
import { useGetOrdersQuery } from "../../../redux/features/allApis/ordersApi/ordersApi";

const OrderDetails = ({ id }) => {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const singleOrder = orders?.find((order) => order._id === id);
  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!singleOrder) {
    return <p className="text-center mt-4">Order not found.</p>;
  }

  const {
    name,
    email,
    title,
    paymentMethod,
    price,
    createdAt,
    licenseType,
    paymentInputs,
    status,
  } = singleOrder;

  return (
    <div className="container mx-auto p-2 sm:p-6 bg-white rounded-lg shadow-lg">
      <div className="p-4">
        <h2 className="text-center text-lg sm:text-xl md:text-2xl font-bold mb-3">
          Details of order
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Name:</span>
            <span className="text-xl text-gray-900">{name}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Email:</span>
            <span className="text-xl text-gray-900">{email}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Theme:</span>
            <span className="text-xl text-gray-900">{title}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">
              License Type:
            </span>
            <span className="text-xl text-gray-900">{licenseType}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">
              Payment Method:
            </span>
            <span className="text-xl text-gray-900">{paymentMethod}</span>
          </li>

          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Time:</span>
            <span className="text-xl text-gray-900">
              {moment(createdAt).format("MMMM Do YYYY, h:mm a") || "..."}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Status:</span>
            <span
              className={`text-xl ${
                status === "completed" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Price:</span>
            <span className="text-xl text-gray-900">${price}</span>
          </li>
        </ul>

        {paymentInputs?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-700">Payment Inputs:</h3>
            <ul className="space-y-2 mt-2">
              {paymentInputs.map((input, index) => (
                <li key={index} className="border-b pb-2">
                  {Object.entries(input).map(([key, value], i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-600 font-semibold">
                        {key}:
                      </span>
                      {typeof value === "string" &&
                      value.match(/https?:\/\/[^\s]+/) ? (
                        <img
                          src={value}
                          className="text-blue-500 hover:underline"
                        />
                      ) : (
                        <span className="text-gray-800">{value}</span>
                      )}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
