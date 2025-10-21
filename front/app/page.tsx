"use client";

import { useEffect, useState } from "react";
import useGetTopics from "@/src/home/services/hooks/useGetTopics";
import ButtonNewTopic from "./components/atoms/ButtonNewTopic";
import ButtonTopicCard from "./components/atoms/ButtonTopicCard";
import Modal from "./components/utils/Modal";
import FormNewTopic from "@/src/home/forms/FormNewTopic";
import usePostTopics from "@/src/home/services/hooks/usePostTopics";

export default function HomePage() {
  const { topics, isLoading, error, refresh } = useGetTopics();
  const {
    isLoading: sendLoadign,
    error: sendError,
    createTopic,
  } = usePostTopics();

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
          topicId={topic.id}
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
                  refresh();
                } catch (err) {
                  console.error(err);
                }
              }}
              isLoading={sendLoadign}
              error={sendError}
            />
          </div>
        </Modal>
      )}
    </main>
  );
}
