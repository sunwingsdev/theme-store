import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Loader from "../../../components/shared/Loader";
import "primereact/resources/themes/lara-light-cyan/theme.css";
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

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [id, setId] = useState("");
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { addToast } = useToasts();

  // State for search input and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // "latest" or "oldest"

  const handleOpenViewModal = () => {
    setIsOpenViewModal(true);
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

  // Function to handle the delete action
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
      addToast("Failed to delete", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // Function to handle status update
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

  // Filter the orders based on search term
  const filteredData = data
    ?.filter((order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  // Custom body for the last column containing view and delete buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <div className="flex items-center">
          <div
            className="rounded-full p-3 hover:bg-green-100 cursor-pointer"
            onClick={handleOpenViewModal}
          >
            <FaEye size={25} className="text-green-500" />
          </div>
          <div
            className="rounded-full p-3 hover:bg-red-100 cursor-pointer ml-2"
            onClick={() => handleOpenDeleteModal(rowData._id)}
          >
            <FaTrash size={25} className="text-red-500" />
          </div>
        </div>
        <DeleteModal
          openDeleteModal={isOpenDeleteModal}
          setOpenDeleteModal={setIsOpenDeleteModal}
          handleDelete={handleDelete}
        />

        <Modal isOpen={isOpenViewModal} closeModal={closeViewModal}>
          <OrderDetails rowData={rowData} />
        </Modal>
      </>
    );
  };

  // Custom body for the status column
  const statusBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.status === "pending" && (
          <button
            className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => handleUpdateStatus(rowData._id)}
          >
            Complete
          </button>
        )}
      </>
    );
  };

  return (
    <div className="px-2 lg:px-6 text-gray-800 lg:mt-12 overflow-x-auto max-w-screen-2xl w-full">
      {/* Search and Sort Controls */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-md"
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
        className="w-full bg-white shadow-md rounded-lg"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column field="name" header="Name" bodyStyle={{ padding: "10px" }} />
        <Column field="title" header="Theme" bodyStyle={{ padding: "2px" }} />
        <Column
          field="licenseType"
          header="License Type"
          
        />
        <Column
          field="paymentMethod"
          header="Payment Method"
          bodyStyle={{ padding: "" }}
        />
        <Column
          field="transactionId"
          header="Transaction ID"
          bodyStyle={{ padding: "2px" }}
        />
        <Column
          field="number"
          header="Number"
          bodyStyle={{ padding: "2px" }}
        />
        <Column
          field="status"
          header="Status"
          bodyStyle={{ padding: "2px" }}
        />
        <Column
          header=""
          bodyStyle={{ padding: "2px" }}
          body={statusBodyTemplate}
        />
        <Column
          header="Actions"
          bodyStyle={{ padding: "10px" }}
          body={actionBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default Orders;
