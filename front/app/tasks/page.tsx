"use client";

import { useState, useEffect } from "react";
import TaskList from "./components/TasksList";
import Modal from "../components/utils/Modal";
import FormTaks from "@/src/home/forms/FormTaks";
import ComfirmDelete from "./components/molecules/ComfirmDelete";
import useGetTasks from "@/src/tasks/services/useGetTasks";

export default function TasksPage() {
  const [newTaskmodal, setNewTaskmodal] = useState<boolean>(false);
  const [editTaskmodal, setEditTaskmodal] = useState<boolean>(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const topicId = 1;

  // Usar el hook para obtener las tareas
  const { data: tasksData, isLoading, error: tasksError, fetchData } = useGetTasks();

  // Cargar tareas cuando se monta el componente
  useEffect(() => {
    fetchData({ topicId });
  }, [topicId, fetchData]);

  // Obtener tareas ya organizadas del backend
  const todoTasks = tasksData?.todo || [];
  const completedTasks = tasksData?.done || [];

  // Mostrar loading
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-white">Cargando tareas...</div>;
  }

  // Mostrar error
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
            setEditTaskmodal={setEditTaskmodal}
            newTask={setNewTaskmodal}
            setDeleteTaskModal={setDeleteTaskModal}
          />
          <TaskList
            title="Complete"
            tasksStatus={1}
            tasks={completedTasks}
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
