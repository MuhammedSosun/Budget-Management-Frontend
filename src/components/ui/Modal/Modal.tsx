import type React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  width = "500px",
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__content" style={{ maxWidth: width }}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>

          <button
            type="button"
            className="modal__close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
