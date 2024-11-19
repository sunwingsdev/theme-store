import { useState } from "react";
import DashboardCourseCard from "../../../components/Dashboard/DashboardCourseCard/DashboardCourseCard";
import Loader from "../../../components/shared/Loader";
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/allApis/coursesApi/coursesApi";
import Modal from "../../../components/shared/Modal";
import { useToasts } from "react-toast-notifications";
import { EditCourseForm } from "../../../components/Dashboard/EditCourseForm/EditCourseForm";
import DeleteModal from "../../../components/shared/DeleteModal";

const AllCoursesList = () => {
  const [deleteCourse] = useDeleteCourseMutation();
  const { data: courses, isLoading } = useGetAllCourseQuery();
  const [id, setId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { addToast } = useToasts();

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setId(id);
  };
  const handleOpenEditModal = (id) => {
    setOpenEditModal(true);
    setId(id);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteCourse(id);
      if (result.data.deletedCount > 0) {
        addToast("Course deleted successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      setOpenDeleteModal(false);
      setId("");
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <div>
        <h2 className="text-4xl text-black font-bold px-3 py-4">
          All Courses Card
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {courses &&
            courses?.map((course) => (
              <DashboardCourseCard
                key={course._id}
                course={course}
                handleOpenDeleteModal={handleOpenDeleteModal}
                handleOpenEditModal={handleOpenEditModal}
              />
            ))}
        </div>
      </div>
      {openDeleteModal && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleDelete={handleDelete}
        />
      )}

      {openEditModal && (
        <Modal
          isOpen={openEditModal}
          closeModal={() => setOpenEditModal(false)}
        >
          <EditCourseForm id={id} closeModal={() => setOpenEditModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default AllCoursesList;
