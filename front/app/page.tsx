"use client";

import { useEffect, useState } from "react";
import useGetTopics from "@/src/home/services/hooks/useGetTopics";
import ButtonNewTopic from "./components/atoms/ButtonNewTopic";
import ButtonTopicCard from "./components/atoms/ButtonTopicCard";
import Modal from "./components/utils/Modal";

export default function HomePage() {
  const { topics, isLoading, error, refresh } = useGetTopics();
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isLoading) return <p>Cargando tópicos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex justify-center flex-wrap w-full my-10 gap-10">
      <ButtonNewTopic onClick={() => setModal(true)} />
      {topics.map((topic) => (
        <ButtonTopicCard
          key={topic.id}
          title={topic.title}
          description={topic.description || ""}
          changeRendering={() => refresh()}
        />
      ))}
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <div>
            <h1>New Topic</h1>
          </div>
        </Modal>
      )}
    </main>
  );
}
