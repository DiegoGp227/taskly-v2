import TaskDiv from "./atoms/TaskDiv";
import TaskNotFound from "./atoms/TasksNotFound";

interface Task {
  id: number;
  user_id: number;
  topics_id: number;
  title: string;
  priority: number;
  status: number;
}

interface TaskListProps {
  title: string;
  tasksStatus: number;
  tasks?: Task[];
  newTask?: (value: boolean) => void;
  setEditTaskmodal: (value: boolean) => void;
  setDeleteTaskModal: (value: boolean) => void;
}

function TaskList({
  title,
  tasks = [],
  newTask,
  setEditTaskmodal,
  setDeleteTaskModal,
}: TaskListProps) {
  return (
    <section className="w-[45%] h-[480px] border-2 border-soft-gray overflow-y-scroll flex flex-col">
      <div className="m-[10px] flex justify-center">
        <h2 className="text-[30px] text-green">{title}</h2>
      </div>

      <div className="w-full flex flex-col justify-start items-center flex-grow gap-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskDiv
              key={task.id}
              title={task.title}
              setEditTaskmodal={setEditTaskmodal}
              setDeleteTaskModal={setDeleteTaskModal}
            />
          ))
        ) : (
          <TaskNotFound />
        )}
      </div>

      {newTask && (
        <div className="w-full p-3 mt-auto">
          <button
            className="w-full py-3 border-2 border-soft-gray cursor-pointer text-white hover:text-green hover:border-green"
            onClick={() => newTask(true)}
          >
            New Task
          </button>
        </div>
      )}
    </section>
  );
}

export default TaskList;
