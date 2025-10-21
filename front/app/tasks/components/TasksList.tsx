import TaskDiv from "./atoms/TaskDiv";
import TaskNotFound from "./atoms/TasksNotFound";
import { useForm } from "react-hook-form";
import { useState } from "react";
import usePostTask from "@/src/tasks/services/usePostTask";

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
  topicId: number;
  onTaskCreated?: () => void;
  newTask?: (value: boolean) => void;
  setEditTaskmodal: (value: boolean) => void;
  setDeleteTaskModal: (value: boolean) => void;
}

interface FormData {
  title: string;
}

function TaskList({
  title,
  tasksStatus,
  tasks = [],
  topicId,
  onTaskCreated,
  newTask,
  setEditTaskmodal,
  setDeleteTaskModal,
}: TaskListProps) {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { createTask, isLoading, error: postError } = usePostTask();

  const onSubmit = async (data: FormData) => {
    const taskData = {
      topics_id: topicId,
      title: data.title,
      priority: 2, // Medium priority por defecto
      status: tasksStatus, // Usa el status de la lista (0 para To Do, 1 para Done)
    };

    const result = await createTask(taskData);

    if (result) {
      reset(); // Limpiar formulario
      setShowForm(false); // Ocultar formulario
      if (onTaskCreated) {
        onTaskCreated(); // Recargar tareas
      }
    }
  };

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
          {!showForm ? (
            <button
              className="w-full py-3 border-2 border-soft-gray cursor-pointer text-white hover:text-green hover:border-green"
              onClick={() => setShowForm(true)}
            >
              New Task
            </button>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
              <input
                {...register("title", { required: "El título es obligatorio" })}
                type="text"
                placeholder="Título de la tarea"
                className="w-full py-2 px-3 bg-hard-gray border-2 border-soft-gray text-white rounded focus:border-green outline-none"
                disabled={isLoading}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title.message}</span>
              )}
              {postError && (
                <span className="text-red-500 text-sm">Error al crear la tarea</span>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-green text-black cursor-pointer hover:bg-opacity-80 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando..." : "Crear"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    reset();
                  }}
                  className="flex-1 py-2 border-2 border-soft-gray text-white cursor-pointer hover:border-green rounded"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}

export default TaskList;
