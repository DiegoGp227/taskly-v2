import TaskDiv from "./atoms/TaskDiv";
import TaskNotFound from "./atoms/TasksNotFound";

interface TaskListProps {
  title: string;
  tasksStatus: number;
}

interface TasksData {
  id: number;
  user_id: number;
  topics_id: number;
  title: string;
  priority: number;
  status: number;
}

function TaskList({ title }: TaskListProps) {
  return (
    <section
      className="w-[45%] h-[480px] border-2 border-soft-gray overflow-y-scroll"
    >
      <div className="m-[10px] flex justify-center">
        <h2 className="text-[30px] text-green">{title}</h2>
      </div>

      <div className="flex flex-col justify-center items-center">
        <TaskDiv title="Ejemplo de tarea" id="" />
        <TaskNotFound />
      </div>
    </section>
  );
}

export default TaskList;
