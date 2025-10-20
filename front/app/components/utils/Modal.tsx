import { FiX } from "react-icons/fi";

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: IModalProps) {
  return (
<div
  className={`fixed inset-0 flex items-center justify-center z-10 
    bg-[#282828]/60 backdrop-blur-xs
  `}
>
      <div className="relative flex flex-col p-4 max-w-[85vw] max-h-[85vh] overflow-x-auto rounded bg-hard-gray border-2 border-soft-gray">
        <div className={`flex justify-end h-[60px] `}>
          <button onClick={onClose} className="cursor-pointer">
            <FiX className={`text-white text-2xl`} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
