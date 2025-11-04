import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { memo } from "react";

interface IButtonTopicCardProps {
  title?: string;
  description?: string;
  topicId?: number;
  onEdit?: (topicId: number) => void;
  onDelete?: (topicId: number) => void;
}

const ButtonTopicCard = memo(function ButtonTopicCard({
  title,
  description,
  topicId,
  onEdit,
  onDelete,
}: IButtonTopicCardProps) {
  const router = useRouter();

  return (
    <button
      className="w-[300px] h-[200px] border-2 border-soft-gray rounded-[5px] p-5 hover:border-green flex flex-col justify-between transition-colors duration-500 cursor-pointer group"
      onClick={() => router.push(`/tasks/${topicId}`)}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-4xl">{title}</h1>
        <p className="text-start text-white">{description}</p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <p className="text-white">To do: 3</p>
          <p className="text-white">Complete: 5</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (topicId !== undefined) onEdit?.(topicId);
            }}
            className="w-5 h-5 cursor-pointer"
          >
            <FiEdit className="w-full h-full text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (topicId !== undefined) onDelete?.(topicId);
            }}
            className="w-6 h-6 cursor-pointer"
          >
            <MdDeleteOutline className="w-full h-full text-red-600" />
          </button>
        </div>
      </div>
    </button>
  );
});

export default ButtonTopicCard;
