// export default function ConfirmDialog({ message, onConfirm, onCancel }) {
//   return (
//     <div style={{
//       position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
//       zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
//     }}>
//       <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
//         <div className="text-center mb-4">
//           <span className="text-5xl">⚠️</span>
//         </div>
//         <p className="text-gray-800 font-bold text-center text-lg mb-2">Are you sure?</p>
//         <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">{message}</p>
//         <div className="flex gap-3">
//           <button
//             onClick={onCancel}
//             className="flex-1 border border-gray-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-500 transition"
//           >
//             Yes, Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
      }}
      className="flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_rgba(0,0,0,0.25)] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#1E2ED8] via-[#243BFF] to-[#4F6BFF] px-8 py-8">
          
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Confirm Action
            </h2>

            <p className="mt-2 text-center text-blue-100 text-sm">
              This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-7">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-center text-slate-700 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            
            <button
              onClick={onCancel}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-[#243BFF] hover:bg-blue-50 hover:text-[#243BFF]"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 font-semibold text-white shadow-lg shadow-red-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              Yes, Remove
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}