import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { useGetOrdersQuery } from "../../../redux/features/allApis/ordersApi/ordersApi";
import Loader from "../../../components/shared/Loader";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [sortOption, setSortOption] = useState("latest"); // State for sorting
  const filteredOrders = orders?.filter((order) => order.email === user?.email);

  if (isLoading || !user) {
    return <Loader />;
  }

  // Sorting the orders based on the selected option
  const sortedOrders = filteredOrders
    ? [...filteredOrders].sort((a, b) => {
        if (sortOption === "latest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      })
    : [];

  // Function to handle the sorting option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleDownload = (zipFileUrl) => {
    window.open(zipFileUrl, "_blank");
  };

  const downloadBodyTemplate = (rowData) => {
    if (rowData.status === "completed") {
      return (
        <button
          onClick={() => handleDownload(rowData.zipFile)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Download
        </button>
      );
    } else if (rowData.status === "pending") {
      return <span className="text-gray-500">Wait for accepting the order</span>;
    }
    return null;
  };

  return (
    <div className="px-2 lg:px-6 text-gray-800 lg:mt-12 overflow-x-auto max-w-screen-2xl w-full">
      {/* Sorting Select */}
      <div className="flex justify-end mb-4">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-md bg-white"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <DataTable
        value={sortedOrders}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        className="w-full bg-white shadow-md rounded-lg"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column field="title" header="Theme" bodyStyle={{ padding: "10px" }} />
        <Column
          field="licenseType"
          header="License Type"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          field="paymentMethod"
          header="Payment Method"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          field="transactionId"
          header="Transaction ID"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          field="number"
          header="Number"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          field="status"
          header="Status"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          header="Download"
          body={downloadBodyTemplate}
          bodyStyle={{ padding: "10px" }}
        />
      </DataTable>
    </div>
  );
};

export default MyOrders;
