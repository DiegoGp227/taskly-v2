import { FaGhost } from "react-icons/fa";

function TaskNotFound() {
  return (
    <div
      className="w-[95%] py-[10px] flex justify-center gap-[10px] 
                 border-t-2 border-b-2 border-[var(--border-color)] 
                 my-[10px]"
    >
      <p className="text-[#ccc] text-[1rem]">Tasks not found</p>
      <FaGhost className="text-green w-5 h-5" />
    </div>
  );
}

export default TaskNotFound;
