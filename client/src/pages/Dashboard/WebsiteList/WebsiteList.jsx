import { useState } from "react";
import {
  useDeleteWebsiteMutation,
  useGetAllWebsitesQuery,
} from "../../../redux/features/allApis/websitesApi/websitesApi";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/shared/DeleteModal";
import { useToasts } from "react-toast-notifications";
import Modal from "../../../components/shared/Modal";
import EditWebsiteForm from "../../../components/Dashboard/EditWebsiteForm/EditWebsiteForm";
import { useGetTechnologiesQuery } from "../../../redux/features/allApis/technologyApi/technologyApi";

const WebsitesList = () => {
  const { data: websites, isLoading } = useGetAllWebsitesQuery();
  const { data: technologies } = useGetTechnologiesQuery();
  const [deleteWebsite] = useDeleteWebsiteMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [filterTech, setFilterTech] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [websitesPerPage] = useState(10);
  const { addToast } = useToasts();

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setId(id);
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteWebsite(id);
      if (result.data.deletedCount > 0) {
        addToast("Deleted successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
        setOpenDeleteModal(false);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const handleOpenEditModal = (id) => {
    setOpenEditModal(true);
    setId(id);
  };

  const filteredWebsites =
    websites?.filter((website) => {
      return (
        website.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterTech === "" ||
          website.technology.toLowerCase().includes(filterTech.toLowerCase()))
      );
    }) || [];

  const indexOfLastWebsite = currentPage * websitesPerPage;
  const indexOfFirstWebsite = indexOfLastWebsite - websitesPerPage;
  const currentWebsites = filteredWebsites.slice(
    indexOfFirstWebsite,
    indexOfLastWebsite
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="p-6 w-full">
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search by website name"
            className="px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded"
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
          >
            <option value="">Filter by technology</option>
            {technologies?.map((tech) => (
              <option key={tech.value} value={tech.value}>
                {tech.label}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-white uppercase tracking-wider border-r border-gray-300">
                  Image
                </th>
                <th className="px-3 py-2 text-left font-medium text-white uppercase tracking-wider border-r border-gray-300">
                  Title
                </th>
                <th className="px-3 py-2 text-left font-medium text-white uppercase tracking-wider border-r border-gray-300">
                  Technology
                </th>
                <th className="px-3 py-2 text-left font-medium text-white uppercase tracking-wider border-r border-gray-300">
                  Demo
                </th>
                <th className="px-3 py-2 text-left font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentWebsites.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-3 py-1 text-center text-gray-500"
                  >
                    No websites available
                  </td>
                </tr>
              ) : (
                currentWebsites?.map((website) => (
                  <tr key={website._id} className="border-b border-gray-300">
                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">
                      <img
                        src={website.image}
                        alt={website.title}
                        className="h-20 rounded-lg"
                      />
                    </td>
                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">
                      {website.title}
                    </td>
                    <td className="px-3 py-1 whitespace-nowrap capitalize border-r border-gray-300">
                      {website.technology}
                    </td>
                    <td className="px-3 py-1 whitespace-nowrap border-r border-gray-300">
                      <Link
                        rel="noreferrer"
                        target={"_blank"}
                        to={website.demoFrontend}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Demo
                      </Link>
                    </td>
                    <td className="px-3 py-1 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditModal(website._id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 ml-4"
                        onClick={() => handleOpenDeleteModal(website._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        <div className="mt-4 flex justify-center space-x-2">
          {Array.from(
            { length: Math.ceil(filteredWebsites.length / websitesPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                className="px-4 py-2 border rounded"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        handleDelete={handleDelete}
        loading={loading}
      />
      <Modal isOpen={openEditModal} closeModal={() => setOpenEditModal(false)}>
        <EditWebsiteForm id={id} closeModal={() => setOpenEditModal(false)} />
      </Modal>
    </>
  );
};

export default WebsitesList;
