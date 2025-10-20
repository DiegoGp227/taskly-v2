import { IconType } from "react-icons";

interface IButtonActionProps {
  onClick: () => void;
  icon: IconType;
  color?: string;
  size?: number;
}

export default function ButtonAction({
  onClick,
  icon: Icon,
  color,
  size,
}: IButtonActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-2 rounded hover:opacity-80 transition cursor-pointer"
    >
      <Icon size={size} color={color} />
    </button>
  );
}
