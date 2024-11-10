import { useLocation, Link } from "react-router-dom";
import successImage from "../../../assets/order-success.svg"; // Optional success image

const OrderSuccess = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return <div>Order details not available.</div>;
  }

  const { licenseType, price, title, websiteId, transactionId, paymentMethod } =
    orderDetails;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 sm:py-16">
      <div className="max-w-2xl bg-white shadow-md rounded-lg p-6 sm:p-10 text-center">
        <img
          src={successImage}
          alt="Order Successful"
          className="mx-auto size-72 mb-6"
        />
        <h2 className="text-2xl font-semibold text-green-600">
          Order Successful!
        </h2>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase. Your order has been placed successfully.
          Our team will review your payment and confirm shortly.
        </p>
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <p>Theme:</p>
              <p className="font-medium">{title}</p>
            </div>
            <div className="flex justify-between">
              <p>License Type:</p>
              <p className="font-medium">
                {licenseType === "single-license"
                  ? "Single License"
                  : "Unlimited License"}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Price:</p>
              <p className="font-medium">{price} ৳</p>
            </div>
            <div className="flex justify-between">
              <p>Payment Method:</p>
              <p className="font-medium">{paymentMethod}</p>
            </div>
            <div className="flex justify-between">
              <p>Transaction ID:</p>
              <p className="font-medium">{transactionId}</p>
            </div>
            <div className="flex justify-between">
              <p>Website ID:</p>
              <p className="font-medium">{websiteId}</p>
            </div>
          </div>
        </div>
        <Link
          to="/dashboard/my-orders"
          className="mt-8 inline-block px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          Go to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
