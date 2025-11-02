import { FaRegEdit } from "react-icons/fa";
import ButtonAction from "./ButtonAction";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { motion } from "framer-motion";

interface Task {
  id: number;
  user_id: number;
  topics_id: number;
  title: string;
  priority: number;
  status: number;
}

interface TaskDivProps {
  task?: Task;
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStatus?: (task: Task) => void;
  isUpdating?: boolean;
  setEditTaskmodal: (value: boolean) => void;
  setDeleteTaskModal: (value: boolean) => void;
}

function TaskDiv({ task, title, onEdit, onDelete, onToggleStatus, isUpdating, setEditTaskmodal, setDeleteTaskModal }: TaskDivProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`w-[95%] py-[10px] flex justify-between gap-10 border-2 ${
        isUpdating ? 'border-green bg-hard-gray/50' : 'border-soft-gray'
      } items-center transition-all duration-300 relative`}
    >
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center bg-hard-gray/30 rounded">
          <div className="w-5 h-5 border-2 border-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className={isUpdating ? 'opacity-50' : ''}>
        <div className="flex gap-3 px-2">
          <input
            type="checkbox"
            checked={task?.status === 1}
            onChange={() => task && onToggleStatus?.(task)}
            disabled={isUpdating}
            className="flex items-center gap-[12px] cursor-pointer px-[15px] py-[10px] bg-transparent transition-colors duration-300 ease-in-out select-none text-[#ccc] relative disabled:cursor-not-allowed"
          />
          <label className="text-white">{title}</label>
        </div>
      </div>
      <div className={`flex min-w-2 mr-3 ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}>
        <ButtonAction
          onClick={() => {
            if (onEdit) {
              onEdit();
            } else {
              setEditTaskmodal(true);
            }
          }}
          icon={FaRegEdit}
          color="#fff"
        />
        <ButtonAction
          onClick={() => {
            if (onDelete) {
              onDelete();
            } else {
              setDeleteTaskModal(true);
            }
          }}
          icon={RiDeleteBin6Fill}
          color="#ff0000"
        />
      </div>
    </motion.div>
  );
}

export default TaskDiv;
