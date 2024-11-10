import moment from "moment";

const OrderDetails = ({ rowData }) => {
  const {
    name,
    email,
    title,
    paymentMethod,
    price,
    createdAt,
    licenseType,
    transactionId,
    number,
    status,
  } = rowData;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="p-4">
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
            <span className="text-lg font-semibold text-gray-700">License Type:</span>
            <span className="text-xl text-gray-900">{licenseType}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Payment Method:</span>
            <span className="text-xl text-gray-900">{paymentMethod}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Transaction ID:</span>
            <span className="text-xl text-gray-900">{transactionId}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Number:</span>
            <span className="text-xl text-gray-900">{number}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Time:</span>
            <span className="text-xl text-gray-900">
              {moment(createdAt).format("MMMM Do YYYY, h:mm a") || "..."}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Status:</span>
            <span className={`text-xl ${status === "Completed" ? "text-green-500" : "text-red-500"}`}>
              {status}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">Price:</span>
            <span className="text-xl text-gray-900">${price}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
