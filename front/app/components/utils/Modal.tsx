import { FiX } from "react-icons/fi";

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: IModalProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-10 
        bg-[#031827]/88
   `}
    >
      <div className="relative flex flex-col p-4 max-w-[85vw] max-h-[85vh] overflow-x-auto rounded">
        <div className={`flex justify-end h-[60px] `}>
          <button onClick={onClose}>
            <FiX className={`text-white text-2xl`} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
