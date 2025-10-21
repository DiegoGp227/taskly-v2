interface IComfirmDeleteProps {
  setDeleteTaskModal: (value: boolean) => void;
  deleteTask: () => void;
  isDeleteLoading: boolean;
}

export default function ComfirmDelete({
  setDeleteTaskModal,
  deleteTask,
  isDeleteLoading,
}: IComfirmDeleteProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <p className="text-white text-4xl">Delete task?</p>
      <div className="w-full flex gap-5 justify-between">
        <button
          className="button w-full border-2 border-green"
          onClick={() => {
            setDeleteTaskModal(false);
          }}
          disabled={isDeleteLoading}
        >
          Cancel
        </button>

        <button
          className="buttonRed w-full border-2 border-[#ff0000]"
          onClick={deleteTask}
          disabled={isDeleteLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
