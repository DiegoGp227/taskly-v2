"use client";

import { useState } from "react";
import TaskList from "../components/TasksList";
import Modal from "../../components/utils/Modal";
import FormTaks from "@/src/home/forms/FormTaks";
import ComfirmDelete from "../components/molecules/ComfirmDelete";
import useTasks from "@/src/tasks/services/hooks/useTasks";

interface TasksPageProps {
  params: {
    id: string;
  };
}

export default function TasksPage({ params }: TasksPageProps) {
  const [editTaskmodal, setEditTaskmodal] = useState<boolean>(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
  const topicId = parseInt(params.id, 10);
  const {
    todoTasks,
    completedTasks,
    isGetLoading,
    gettasksError,
    createTask,
    isPostLoading,
    postTaskError,
    refetch,
    updateTask,
    isPutLoading,
    putTaskError,
  } = useTasks({ topicId }); 

  if (isNaN(topicId)) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        ID de topic inválido
      </div>
    );
  }

  // Mostrar loading mientras se cargan las tareas
  if (isGetLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Cargando tareas...
      </div>
    );
  }

  // Mostrar error si falló la carga de tareas
  if (gettasksError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {String(gettasksError)}
      </div>
    );
  }

  return (
    <>
      <div>
        <section className="flex justify-center gap-10 my-10">
          {/* Lista de tareas "To Do" (status = 0) */}
          <TaskList
            title="To Do"
            tasksStatus={0}
            tasks={todoTasks}
            topicId={topicId}
            // Recargar tareas después de crear una nueva
            onTaskCreated={() => refetch()}
            setEditTaskmodal={setEditTaskmodal}
            setDeleteTaskModal={setDeleteTaskModal}
            // Función centralizada para crear tareas
            createTask={createTask}
            ispostLoading={isPostLoading}
            postTaskError={postTaskError}
          />

          {/* Lista de tareas "Complete" (status = 1) */}
          <TaskList
            title="Complete"
            tasksStatus={1}
            tasks={completedTasks}
            topicId={topicId}
            // Recargar tareas después de crear una nueva
            onTaskCreated={() => refetch()}
            setEditTaskmodal={setEditTaskmodal}
            setDeleteTaskModal={setDeleteTaskModal}
            // Función centralizada para crear tareas
            createTask={createTask}
            ispostLoading={isPostLoading}
            postTaskError={postTaskError}
          />
        </section>
      </div>

      {/* Modal para editar tarea existente */}
      {editTaskmodal && (
        <Modal onClose={() => setEditTaskmodal(false)}>
          <div className="w-96 flex flex-col">
            <FormTaks onSubmit={() => {}} isNew={false} />
          </div>
        </Modal>
      )}

      {/* Modal para confirmar eliminación de tarea */}
      {deleteTaskModal && (
        <Modal onClose={() => setDeleteTaskModal(false)}>
          <div className="w-80 flex flex-col">
            <ComfirmDelete setDeleteTaskModal={setDeleteTaskModal} />
          </div>
        </Modal>
      )}
    </>
  );
}
