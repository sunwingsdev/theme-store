import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Loader from "../../../components/shared/Loader";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {
  useDeleteSingleStudentMutation,
  useGetStudentsQuery,
} from "../../../redux/features/allApis/admissionApi/admissionApi";
import { FaEye, FaTrash } from "react-icons/fa";
import Modal from "../../../components/shared/Modal";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import AdmissionDetails from "../../../components/Dashboard/Sidebar/AdmissionDetails/AdmissionDetails";

const AdmissionStudent = () => {
  const { data, isLoading } = useGetStudentsQuery();
  const [deleteSingleStudent] = useDeleteSingleStudentMutation();
  const [id, setId] = useState("");
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { addToast } = useToasts();

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
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  if (isLoading) {
    return <Loader />;
  }

  // Function to handle the delete action
  const handleDelete = async () => {
    // Implement delete functionality here
    console.log("Delete", id);
    try {
      const result = await deleteSingleStudent(id);
      if (result.data.insertedId) {
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

  const timeBody = (rowData) => {
    return (
      <>
        <div>
          {moment(rowData.createdAt).format("MMMM Do YYYY, h:mm a") || "..."}
        </div>
      </>
    );
  };

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
        <Modal isOpen={isOpenDeleteModal} closeModal={closeDeleteModal}>
          <div className="">
            <h2 className="text-center pb-6 pt-4 text-xl">
              Are you sure want to delete it?
            </h2>
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <button
                onClick={closeDeleteModal}
                className="bg-green-600 hover:bg-green-800 px-5 py-3 rounded text-white text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-800 px-5 py-3 rounded text-white text-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isOpenViewModal} closeModal={closeViewModal}>
          <AdmissionDetails rowData={rowData} />
        </Modal>
      </>
    );
  };

  return (
    <div className="px-2 lg:px-6 bg-gray-100 text-gray-800 lg:mt-12 overflow-x-auto">
      <DataTable
        value={data}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        className="w-full bg-white shadow-md rounded-lg"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column field="name" header="Name" bodyStyle={{ padding: "10px" }} />
        <Column field="phone" header="Phone" bodyStyle={{ padding: "10px" }} />
        <Column
          field="profession"
          header="Profession"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          field="location"
          header="Location"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          field="createdAt"
          header="Time"
          style={{ width: "20%" }}
          bodyStyle={{ padding: "10px" }}
          body={timeBody}
        />
        <Column
          field="course"
          header="Course"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          field="schedule"
          header="Schedule"
          bodyStyle={{ padding: "10px" }}
        />
        <Column
          header=""
          bodyStyle={{ padding: "10px" }}
          body={actionBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default AdmissionStudent;
