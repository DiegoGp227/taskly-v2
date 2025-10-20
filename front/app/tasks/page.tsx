"use client";

import { useState } from "react";
import TaskList from "./components/TasksList";
import Modal from "../components/utils/Modal";
import FormTaks from "@/src/home/forms/FormTaks";
import ComfirmDelete from "./components/molecules/ComfirmDelete";

export default function TasksPage() {
  const [newTaskmodal, setNewTaskmodal] = useState<boolean>(false);
  const [editTaskmodal, setEditTaskmodal] = useState<boolean>(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <>
      <div>
        <section className="flex justify-center gap-10 my-10">
          <TaskList
            title="To Do"
            tasksStatus={0}
            setEditTaskmodal={setEditTaskmodal}
            newTask={setNewTaskmodal}
            setDeleteTaskModal={setDeleteTaskModal}
          />
          <TaskList
            title="Complete"
            tasksStatus={1}
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
