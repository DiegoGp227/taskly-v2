"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import ButtonNewTopic from "./components/atoms/ButtonNewTopic";
import ButtonTopicCard from "./components/atoms/ButtonTopicCard";
import Modal from "./components/utils/Modal";
import FormNewTopic from "@/src/home/forms/FormNewTopic";
import ComfirmDelete from "./tasks/components/molecules/ComfirmDelete";
import useTopics from "@/src/home/services/hooks/useTopics";

interface Topic {
  id: number;
  title: string;
  description?: string | null;
}

export default function HomePage() {
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const {
    topics,
    loadingTopics,
    errorTopics,
    refetchTopics,
    createTopic,
    loaginPostTopic,
    sendError,
    updateTopic,
    loadingPutTopics,
    putTopicError,
  } = useTopics();

  const [modal, setModal] = useState<boolean>(false);
  const topicsRef = useRef(topics);

  useEffect(() => {
    topicsRef.current = topics;
  }, [topics]);

  useEffect(() => {
    refetchTopics();
  }, [refetchTopics]);

  const handleEditClick = useCallback((topicId: number) => {
    const topic = topicsRef.current.find(t => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
      setEditModal(true);
    }
  }, []);

  const handleDeleteClick = useCallback((topicId: number) => {
    const topic = topicsRef.current.find(t => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
      setDeleteTaskModal(true);
    }
  }, []);

  if (loadingTopics) return <p>Cargando tópicos...</p>;
  if (errorTopics) return <p>Error: {errorTopics}</p>;

  return (
    <main className="flex justify-center flex-wrap w-full my-10 gap-10">
      <ButtonNewTopic onClick={() => setModal(true)} />
      {topics.map((topic) => (
        <ButtonTopicCard
          key={topic.id}
          title={topic.title}
          description={topic.description || ""}
          topicId={topic.id}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      ))}
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <div className="w-96 h-[400px] flex flex-col">
            <FormNewTopic
              onSubmit={async (data) => {
                try {
                  await createTopic(data);
                  setModal(false);
                  refetchTopics();
                } catch (err) {
                  console.error(err);
                }
              }}
              isLoading={loaginPostTopic}
              error={sendError}
            />
          </div>
        </Modal>
      )}
      {editModal && selectedTopic && (
        <Modal
          onClose={() => {
            setEditModal(false);
            setSelectedTopic(null);
          }}
        >
          <div className="w-96 h-[400px] flex flex-col">
            <FormNewTopic
              onSubmit={async (data) => {
                try {
                  await updateTopic(selectedTopic.id, data);
                  setEditModal(false);
                  setSelectedTopic(null);
                  refetchTopics();
                } catch (err) {
                  console.error(err);
                }
              }}
              isLoading={loadingPutTopics}
              error={putTopicError ? String(putTopicError) : null}
              initialData={{
                title: selectedTopic.title,
                description: selectedTopic.description || "",
              }}
              isEdit={true}
            />
          </div>
        </Modal>
      )}
      {deleteTaskModal && selectedTopic && (
        <Modal
          onClose={() => {
            setDeleteTaskModal(false);
            setSelectedTopic(null);
          }}
        >
          <div className="w-80 flex flex-col">
            <ComfirmDelete
              setDeleteTaskModal={(value) => {
                setDeleteTaskModal(value);
                if (!value) setSelectedTopic(null);
              }}
              deleteTask={() => {
                console.log("Deleting topic:", selectedTopic.id);
                // Aquí implementarás la lógica de eliminación
                setDeleteTaskModal(false);
                setSelectedTopic(null);
              }}
            />
          </div>
        </Modal>
      )}
    </main>
  );
}
