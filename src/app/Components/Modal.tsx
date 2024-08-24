
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children, onClose }: ModalProps) {

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-body bg-gradient-to-r from-pink-500 to-violet-600">
        {children}
        <button className="p-2" onClick={onClose}></button>
      </div>
    </div>
  );
}


