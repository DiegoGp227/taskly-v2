import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

interface IButtonTopicCardProps {
  title?: string;
  description?: string;
  changeVisivilityEdit?: () => void;
  changeRendering?: () => void;
}

export default function ButtonTopicCard({
  title,
  description,
  changeVisivilityEdit,
  changeRendering,
}: IButtonTopicCardProps) {
  return (
    <button className="w-[300px] h-[200px] border-2 border-soft-gray rounded-[5px] p-5 hover:border-green flex flex-col justify-evenly">
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
            onClick={() => changeVisivilityEdit}
            className="w-5 h-5 cursor-pointer"
          >
            <FiEdit className="w-full h-full text-white" />
          </button>
          <button
            onClick={() => changeRendering}
            className="w-6 h-6 cursor-pointer"
          >
            <MdDeleteOutline className="w-full h-full text-red-600" />
          </button>
        </div>
      </div>
    </button>
  );
}
