"use client";

import { useState, useEffect } from "react";
import TaskList from "../components/TasksList";
import Modal from "../../components/utils/Modal";
import FormTaks from "@/src/home/forms/FormTaks";
import ComfirmDelete from "../components/molecules/ComfirmDelete";
import useGetTasks from "@/src/tasks/services/useGetTasks";

interface TasksPageProps {
  params: {
    id: string;
  };
}

export default function TasksPage({ params }: TasksPageProps) {
  const [newTaskmodal, setNewTaskmodal] = useState<boolean>(false);
  const [editTaskmodal, setEditTaskmodal] = useState<boolean>(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Obtener topicId del parámetro de la URL
  const topicId = parseInt(params.id, 10);

  const { data: tasksData, isLoading, error: tasksError, fetchData } = useGetTasks();

  useEffect(() => {
    if (!isNaN(topicId)) {
      fetchData({ topicId });
    }
  }, [topicId, fetchData]);

  const todoTasks = tasksData?.todo || [];
  const completedTasks = tasksData?.done || [];

  // Validar que el topicId sea un número válido
  if (isNaN(topicId)) {
    return <div className="flex justify-center items-center h-screen text-red-500">ID de topic inválido</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-white">Cargando tareas...</div>;
  }

  if (tasksError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {String(tasksError)}</div>;
  }

  return (
    <>
      <div>
        <section className="flex justify-center gap-10 my-10">
          <TaskList
            title="To Do"
            tasksStatus={0}
            tasks={todoTasks}
            topicId={topicId}
            onTaskCreated={() => fetchData({ topicId })}
            setEditTaskmodal={setEditTaskmodal}
            newTask={setNewTaskmodal}
            setDeleteTaskModal={setDeleteTaskModal}
          />
          <TaskList
            title="Complete"
            tasksStatus={1}
            tasks={completedTasks}
            topicId={topicId}
            onTaskCreated={() => fetchData({ topicId })}
            setEditTaskmodal={setEditTaskmodal}
            setDeleteTaskModal={setDeleteTaskModal}
          />
        </section>
      </div>

      {newTaskmodal && (
        <Modal onClose={() => setNewTaskmodal(false)}>
          <div className="w-96 flex flex-col">
            <FormTaks onSubmit={() => {}} error={error} isNew={true} />
          </div>
        </Modal>
      )}

      {editTaskmodal && (
        <Modal onClose={() => setEditTaskmodal(false)}>
          <div className="w-96 flex flex-col">
            <FormTaks onSubmit={() => {}} error={error} isNew={false} />
          </div>
        </Modal>
      )}

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
