import React from "react";
import ReactDOM from "react-dom";
import Header from "../header";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  name: string;
};

const Modal = ({ isOpen, children, onClose, name }: Props) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="z-100 fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 p-4 w-full h-full overflow-y-auto">
      <div className="bg-white dark:bg-dark-secondary shadow-lg p-4 rounded-lg sm:w-full lg:w-1/3 max-w.2xl">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex justify-center items-center bg-blue-primary hover:bg-blue-600 rounded-full w-7 h-7 text-white"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
