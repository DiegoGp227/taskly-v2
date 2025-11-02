import { MdOutlineAddBox } from "react-icons/md";

interface IButtonNewTopicProps {
  onClick: () => void;
}

export default function ButtonNewTopic({ onClick }: IButtonNewTopicProps) {
  return (
    <button
      className="border-2 border-soft-gray w-[300px] h-[200px] cursor-pointer rounded-[5px] hover:border-green flex items-center justify-center transition-colors duration-500"
      onClick={onClick}
    >
      <MdOutlineAddBox className="text-green h-20 w-20" />
    </button>
  );
}
