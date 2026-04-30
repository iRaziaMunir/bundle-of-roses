import { useEffect } from "react";

export default function AdminDialog({
  open,
  title,
  message,
  confirmText = "OK",
  cancelText,
  danger = false,
  onConfirm,
  onCancel,
}) {
  const isConfirm = cancelText != null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") (isConfirm ? onCancel : onConfirm)?.();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, isConfirm, onCancel, onConfirm]);

  if (!open) return null;

  function backdropClick() {
    if (isConfirm) onCancel?.();
    else onConfirm?.();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="admin-dialog-title"
      aria-describedby="admin-dialog-desc"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        aria-label={isConfirm ? "Cancel" : "Close"}
        onClick={backdropClick}
      />
      <div
        className="relative w-full max-w-md rounded-[28px] border border-[#eadfdf] bg-[#fcfaf8] p-6 shadow-[0_24px_60px_rgba(42,26,26,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="admin-dialog-title" className="text-lg font-semibold tracking-tight text-[#1d1a1a]">
          {title}
        </h3>
        <p id="admin-dialog-desc" className="mt-3 text-sm leading-6 text-gray-600">
          {message}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          {isConfirm ? (
            <>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-[#eadfdf] bg-white px-5 py-2.5 text-sm font-medium text-[#1d1a1a] hover:bg-[#f7f1ed]"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_26px_rgba(30,29,34,0.14)] ${
                  danger ? "bg-[#8b4259] hover:opacity-95" : "bg-[#1e1d22] hover:opacity-95"
                }`}
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-full bg-[#1e1d22] px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_26px_rgba(30,29,34,0.14)] hover:opacity-95 sm:ml-auto"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
