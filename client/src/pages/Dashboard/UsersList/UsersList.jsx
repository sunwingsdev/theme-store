import { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from "../../../redux/features/allApis/usersApi/UsersApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import { useToasts } from "react-toast-notifications";

const UsersList = () => {
  const { data: users, refetch, isLoading } = useGetAllUsersQuery();
  const [updateRole] = useUpdateRoleMutation();
  const { addToast } = useToasts();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Filter users based on search term and role
  const filteredUsers =
    users?.filter((user) => {
      const matchesSearchTerm =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole
        ? user.role.toLowerCase() === filterRole.toLowerCase()
        : true;

      return matchesSearchTerm && matchesRole;
    }) || [];

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (e) => {
    setCurrentPage(e.page + 1);
  };

  // Handle role assignment
  const handleRoleChange = async (userId, newRole) => {
    try {
      const result = await updateRole({ id: userId, role: newRole });
      if (result.data.modifiedCount > 0) {
        addToast("User role updated successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        refetch();
      }
    } catch (error) {
      addToast("Failed to update role", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="px-2 lg:px-6 text-gray-800 lg:mt-12 overflow-x-auto max-w-screen-2xl w-full">
      <div className="flex flex-col md:flex-row md:justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email"
          className="px-4 border border-gray-300 rounded-md shadow-sm"
        />
        <Dropdown
          value={filterRole}
          options={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
          onChange={(e) => setFilterRole(e.value)}
          placeholder="Filter by role"
          className="px-4 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          value={currentUsers}
          paginator={false}
          className="w-full bg-white shadow-lg rounded-lg"
          stripedRows
          showGridlines
        >
          <Column
            field="image"
            header="Image"
            body={(rowData) => (
              <img
                src={rowData.image}
                alt={rowData.name}
                className="w-12 h-12 rounded-full"
              />
            )}
          />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="role" header="Role" />
          <Column
            header="Actions"
            body={(rowData) => (
              <div className="flex items-center space-x-2">
                <Dropdown
                  value={rowData.role}
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                  ]}
                  onChange={(e) => handleRoleChange(rowData._id, e.value)}
                  placeholder="Give Role"
                  className="p-inputtext-sm"
                />
              </div>
            )}
          />
        </DataTable>
      )}

      <Paginator
        first={indexOfFirstUser}
        rows={usersPerPage}
        totalRecords={filteredUsers.length}
        onPageChange={handlePageChange}
        className="mt-4 flex justify-center space-x-2"
      />
    </div>
  );
};

export default UsersList;
