import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Loader from "../../../components/shared/Loader";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Change the theme if necessary
import "primereact/resources/primereact.min.css";
import { FaEye, FaTrash } from "react-icons/fa";
import Modal from "../../../components/shared/Modal";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import DeleteModal from "../../../components/shared/DeleteModal";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateStatusMutation,
} from "../../../redux/features/allApis/ordersApi/ordersApi";
import OrderDetails from "../../../components/Dashboard/OrderDetails/OrderDetails";
import { Link } from "react-router-dom";

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [id, setId] = useState("");
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { addToast } = useToasts();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const handleOpenViewModal = (id) => {
    setIsOpenViewModal(true);
    setId(id);
  };
  const closeViewModal = () => {
    setIsOpenViewModal(false);
  };
  const handleOpenDeleteModal = (id) => {
    setIsOpenDeleteModal(true);
    setId(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  const handleDelete = async () => {
    try {
      const result = await deleteOrder(id);
      if (result.data.deletedCount > 0) {
        addToast("Deleted successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast("Failed to delete", { appearance: "error", autoDismiss: true });
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      const result = await updateStatus(id);
      if (result.data.modifiedCount > 0) {
        addToast("Order status updated to Complete", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast("Failed to update status", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const filteredData = data
    ?.filter((order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      return sortOrder === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  const actionBodyTemplate = (rowData) => (
    <div className="flex items-center space-x-2">
      <div
        className="rounded-full p-2 cursor-pointer hover:bg-green-100"
        onClick={() => handleOpenViewModal(rowData._id)}
        title="View Details"
      >
        <FaEye size={20} className="text-green-500" />
      </div>
      <div
        className="rounded-full p-2 cursor-pointer hover:bg-red-100"
        onClick={() => handleOpenDeleteModal(rowData._id)}
        title="Delete Order"
      >
        <FaTrash size={20} className="text-red-500" />
      </div>

      <DeleteModal
        openDeleteModal={isOpenDeleteModal}
        setOpenDeleteModal={setIsOpenDeleteModal}
        handleDelete={handleDelete}
      />
      <Modal isOpen={isOpenViewModal} closeModal={closeViewModal}>
        <OrderDetails id={id} />
      </Modal>
    </div>
  );
  const paymentInputsBodyTemplate = (rowData) => {
    // Check if paymentInputs exists and is an array
    if (rowData.paymentInputs && rowData.paymentInputs.length > 0) {
      return (
        <div>
          {rowData.paymentInputs.map((input, index) => (
            <div key={index} className="">
              {Object.entries(input).map(([key, value], i) => (
                <div key={i} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <strong>{key}:</strong>
                    {typeof value === "string" &&
                    value.match(/https?:\/\/[^\s]+/) ? (
                      <Link
                        to={value}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={value}
                          alt={key}
                          className="w-16 h-16 object-cover border border-gray-300 rounded cursor-pointer"
                        />
                      </Link>
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                  {typeof value === "string" &&
                    value.match(/https?:\/\/[^\s]+/) && (
                      <span className="text-xs text-gray-500 italic">
                        Click on the image to view in a new tab
                      </span>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return <span className="text-gray-500 italic">No Inputs</span>;
  };

  const statusBodyTemplate = (rowData) => {
    if (rowData.status === "pending") {
      return (
        <button
          className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition duration-150"
          onClick={() => handleUpdateStatus(rowData._id)}
        >
          Accept
        </button>
      );
    } else if (rowData.status === "completed") {
      return <span className="text-green-500 font-semibold">Accepted</span>;
    }
  };

  return (
    <div className="px-2 lg:px-6 text-gray-800 lg:mt-12 overflow-x-auto max-w-screen-2xl w-full">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl">
        All orders
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <DataTable
        value={filteredData}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        className="w-full bg-white shadow-lg rounded-lg"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        stripedRows
        showGridlines
      >
        <Column field="name" header="Name" />
        <Column field="title" header="Script" />
        <Column field="licenseType" header="License Type" />
        <Column field="paymentMethod" header="Payment Method" />
        <Column header="Payment Inputs" body={paymentInputsBodyTemplate} />
        <Column field="status" header="Status" body={statusBodyTemplate} />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default Orders;
