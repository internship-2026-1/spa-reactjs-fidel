import { useEffect } from "react";
import { Button } from 'lib-components-react'
import './modal.css'

export function Modal({ title, onClose, onConfirm, confirmLabel = "Guardar", confirmDisabled = false, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Cerrar">&times;</button>
        </header>
        <div className="modal__body">{children}</div>
        {onConfirm && (
          <footer className="modal__footer">
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" onClick={onConfirm} disabled={confirmDisabled}>{confirmLabel}</Button>
          </footer>
        )}
      </div>
    </div>
  );
}
