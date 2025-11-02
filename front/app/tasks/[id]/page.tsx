"use client";

import { useState, useMemo } from "react";
import TaskList from "../components/TasksList";
import Modal from "../../components/utils/Modal";
import FormTaks from "@/src/home/forms/FormTaks";
import ComfirmDelete from "../components/molecules/ComfirmDelete";
import useTasks from "@/src/tasks/services/hooks/useTasks";

interface Task {
  id: number;
  user_id: number;
  topics_id: number;
  title: string;
  priority: number;
  status: number;
}

interface TasksPageProps {
  params: {
    id: string;
  };
}

interface TaskFormData {
  title: string;
  priority?: number;
  status?: number;
}

export default function TasksPage({ params }: TasksPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newTaskmodal, setNewTaskmodal] = useState<boolean>(false);
  const [editTaskmodal, setEditTaskmodal] = useState<boolean>(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [optimisticUpdates, setOptimisticUpdates] = useState<Map<number, number>>(new Map());
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);
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
    deleteTask,
    isDeleteLoading,
  } = useTasks({ topicId });

  // Aplicar actualizaciones optimistas a las tareas
  const optimisticTodoTasks = useMemo(() => {
    return todoTasks
      .map(task => ({
        ...task,
        status: optimisticUpdates.has(task.id) ? optimisticUpdates.get(task.id)! : task.status
      }))
      .filter(task => task.status === 0);
  }, [todoTasks, optimisticUpdates]);

  const optimisticCompletedTasks = useMemo(() => {
    return completedTasks
      .map(task => ({
        ...task,
        status: optimisticUpdates.has(task.id) ? optimisticUpdates.get(task.id)! : task.status
      }))
      .filter(task => task.status === 1);
  }, [completedTasks, optimisticUpdates]);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditTaskmodal(true);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setDeleteTaskModal(true);
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!selectedTask) return;

    const result = await updateTask(selectedTask.id, {
      title: taskData.title,
      priority: taskData.priority,
      status: taskData.status,
    });

    if (result) {
      setEditTaskmodal(false);
      setSelectedTask(null);
      refetch();
    }
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    const result = await deleteTask(selectedTask.id);

    if (result) {
      setDeleteTaskModal(false);
      setSelectedTask(null);
      refetch();
    }
  };

  const handleToggleStatus = async (task: Task) => {
    // Cambiar el status: 0 -> 1 (To Do -> Complete), 1 -> 0 (Complete -> To Do)
    const newStatus = task.status === 0 ? 1 : 0;

    // Marcar esta tarea como "actualizando"
    setUpdatingTaskId(task.id);

    // 1. Actualización optimista inmediata (UI se actualiza al instante)
    setOptimisticUpdates(prev => {
      const newMap = new Map(prev);
      newMap.set(task.id, newStatus);
      return newMap;
    });

    // 2. Hacer el update en el backend en paralelo
    const result = await updateTask(task.id, {
      title: task.title,
      priority: task.priority,
      status: newStatus,
    });

    // 3. Limpiar la actualización optimista y refrescar con datos reales
    setOptimisticUpdates(prev => {
      const newMap = new Map(prev);
      newMap.delete(task.id);
      return newMap;
    });

    // Quitar el estado de loading
    setUpdatingTaskId(null);

    if (result) {
      // Refrescar para sincronizar con el servidor
      refetch();
    } else {
      // Si falla, refetch revierte el cambio
      refetch();
    }
  };

  if (isNaN(topicId)) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        ID de topic inválido
      </div>
    );
  }

  if (isGetLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Cargando tareas...
      </div>
    );
  }

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
          <TaskList
            title="To Do"
            tasksStatus={0}
            tasks={optimisticTodoTasks}
            topicId={topicId}
            onTaskCreated={() => refetch()}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteClick}
            onToggleStatus={handleToggleStatus}
            updatingTaskId={updatingTaskId}
            newTask={setNewTaskmodal}
            setEditTaskmodal={setEditTaskmodal}
            setDeleteTaskModal={setDeleteTaskModal}
            createTask={createTask}
            ispostLoading={isPostLoading}
            postTaskError={postTaskError}
          />

          <TaskList
            title="Complete"
            tasksStatus={1}
            tasks={optimisticCompletedTasks}
            topicId={topicId}
            onTaskCreated={() => refetch()}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteClick}
            onToggleStatus={handleToggleStatus}
            updatingTaskId={updatingTaskId}
            setEditTaskmodal={setEditTaskmodal}
            setDeleteTaskModal={setDeleteTaskModal}
            createTask={createTask}
            ispostLoading={isPostLoading}
            postTaskError={postTaskError}
          />
        </section>
      </div>

      {editTaskmodal && selectedTask && (
        <Modal
          onClose={() => {
            setEditTaskmodal(false);
            setSelectedTask(null);
          }}
        >
          <div className="w-96 flex flex-col">
            <FormTaks
              onSubmit={handleUpdateTask}
              isNew={false}
              initialData={{
                title: selectedTask.title,
              }}
              isPutLoading={isPutLoading}
              putTaskError={putTaskError}
            />
          </div>
        </Modal>
      )}

      {deleteTaskModal && selectedTask && (
        <Modal
          onClose={() => {
            setDeleteTaskModal(false);
            setSelectedTask(null);
          }}
        >
          <div className="w-80 flex flex-col">
            <ComfirmDelete
              setDeleteTaskModal={setDeleteTaskModal}
              deleteTask={handleDeleteTask}
              isDeleteLoading={isDeleteLoading}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
