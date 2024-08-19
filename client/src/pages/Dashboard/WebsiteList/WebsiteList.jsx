import { useState } from "react";
import { useGetAllWebsitesQuery } from "../../../redux/features/allApis/websitesApi/websitesApi";
import { Link } from "react-router-dom";

const WebsitesList = () => {
  const { data: websites, isLoading } = useGetAllWebsitesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTech, setFilterTech] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [websitesPerPage] = useState(10);

  //   const handleDelete = async (id) => {
  //     // Logic to handle deleting a website
  //   };

  //   const handleEdit = (website) => {
  //     // Logic to handle editing a website
  //   };

  const technologyOptions = [
    {
      label: "React",
      value: "react",
    },
    {
      label: "Laravel",
      value: "laravel",
    },
    {
      label: "Wordpress",
      value: "wordpress",
    },
  ];

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
    <div className="p-6 w-full">
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name or email"
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
          {technologyOptions.map((tech) => (
            <option key={tech.value} value={tech.value}>
              {tech.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Technology
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Demo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentWebsites.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No websites available
                </td>
              </tr>
            ) : (
              currentWebsites.map((website) => (
                <tr key={website.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={website.image}
                      alt={website.title}
                      className="h-20 rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {website.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {website.technology}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      rel="noreferrer"
                      target={"_blank"}
                      to={website.demoLink}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      //   onClick={() => handleEdit(website)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 ml-4"
                      //   onClick={() => handleDelete(website.id)}
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
        {[
          ...Array(Math.ceil(filteredWebsites.length / websitesPerPage)).keys(),
        ].map((number) => (
          <button
            key={number + 1}
            className="px-4 py-2 border rounded"
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WebsitesList;
