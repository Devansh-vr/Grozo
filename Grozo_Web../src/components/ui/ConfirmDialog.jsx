export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmText = 'Confirm', danger = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-fade-in">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 btn-ghost border border-gray-200">Cancel</button>
          <button
            onClick={onConfirm}
            className={`flex-1 font-semibold py-2.5 px-4 rounded-xl transition-all ${danger ? 'bg-red-600 hover:bg-red-700 text-white' : 'btn-primary'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
