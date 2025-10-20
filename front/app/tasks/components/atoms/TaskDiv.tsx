import { FaRegEdit } from "react-icons/fa";
import ButtonAction from "./ButtonAction";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface tasks {
  user_id?: number;
  topics_id?: number;
  title: string;
  priority?: number;
  status?: number;
  setEditTaskmodal: (value: boolean) => void;
  setDeleteTaskModal: (value: boolean) => void;
}
function TaskDiv({ title, setEditTaskmodal, setDeleteTaskModal }: tasks) {
  return (
    <div className="w-[95%] py-[10px] flex justify-between gap-10 border-2 border-soft-gray">
      <div>
        <form action="send" className="flex gap-3 px-2">
          <input
            type="checkbox"
            className="flex items-center gap-[12px] cursor-pointer px-[15px] py-[10px] bg-transparent transition-colors duration-300 ease-in-out select-none text-[#ccc] relative"
          />
          <label className="text-white">{title}</label>
        </form>
      </div>
      <div className="flex min-w-2 mr-3">
        <ButtonAction
          onClick={() => setEditTaskmodal(true)}
          icon={FaRegEdit}
          color="#fff"
        />
        <ButtonAction
          onClick={() => setDeleteTaskModal(true)}
          icon={RiDeleteBin6Fill}
          color="#ff0000"
        />
      </div>
    </div>
  );
}

export default TaskDiv;
