import Modal from "./Modal";

const DeleteModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  handleDelete,
  loading,
}) => {
  return (
    <Modal
      isOpen={openDeleteModal}
      closeModal={() => setOpenDeleteModal(false)}
    >
      <div className="my-6">
        <h2 className="text-2xl text-center mb-4">
          Are you sure want to delete?
        </h2>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setOpenDeleteModal(false)}
            className="bg-green-600 text-white hover:bg-green-800 py-2 px-4"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white hover:bg-red-800 py-2 px-4 disabled:bg-slate-500 disabled:text-black"
          >
            {loading ? "Deleting ..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
