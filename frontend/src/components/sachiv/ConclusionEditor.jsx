// import { useState } from 'react';

// export default function ConclusionEditor({ meeting, onSave, onCancel }) {
//   const [conclusion, setConclusion] = useState(meeting.conclusion || '');
//   const [actions, setActions] = useState(meeting.actionsTaken?.join('\n') || '');

//   return (
//     <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="font-semibold text-gray-800">Update — {meeting.title}</h3>
//         <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
//       </div>
//       <div>
//         <label className="text-xs font-medium text-gray-500 block mb-1">Conclusion</label>
//         <textarea
//           className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           rows={3}
//           value={conclusion}
//           onChange={(e) => setConclusion(e.target.value)}
//           placeholder="Write the conclusion..."
//         />
//       </div>
//       <div>
//         <label className="text-xs font-medium text-gray-500 block mb-1">
//           Actions Taken (one per line)
//         </label>
//         <textarea
//           className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           rows={4}
//           value={actions}
//           onChange={(e) => setActions(e.target.value)}
//           placeholder="Road repair assigned&#10;Water supply fixed"
//         />
//       </div>
//       <div className="flex gap-3">
//         <button
//           onClick={() => onSave(
//             meeting._id,
//             conclusion,
//             actions.split('\n').filter((a) => a.trim())
//           )}
//           className="bg-green-700 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-600 transition"
//         >
//           Save
//         </button>
//         <button
//           onClick={onCancel}
//           className="border px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';

export default function ConclusionEditor({ meeting, onSave, onCancel }) {
  const [conclusion, setConclusion] = useState(meeting.conclusion || '');
  const [actions, setActions] = useState(
    meeting.actionsTaken?.join('\n') || ''
  );

  return (
    <div className="bg-[#0B0F1A] border border-[#1E293B] rounded-2xl shadow-xl p-6 space-y-5">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#1E293B] pb-4">
        <h3 className="font-semibold text-white text-lg">
          Update — {meeting.title}
        </h3>

        <button
          onClick={onCancel}
          className="w-9 h-9 rounded-lg bg-[#2A2D3D] text-slate-400 hover:text-white hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      {/* Conclusion */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-300">
          Conclusion
        </label>

        <textarea
          rows={4}
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          placeholder="Write the conclusion..."
          className="w-full bg-[#161B2B] border border-[#334155] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#243BFF] focus:border-[#243BFF] transition"
        />
      </div>

      {/* Actions */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-300">
          Actions Taken (one per line)
        </label>

        <textarea
          rows={5}
          value={actions}
          onChange={(e) => setActions(e.target.value)}
          placeholder={`Road repair assigned\nWater supply fixed`}
          className="w-full bg-[#161B2B] border border-[#334155] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#243BFF] focus:border-[#243BFF] transition"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={() =>
            onSave(
              meeting._id,
              conclusion,
              actions
                .split('\n')
                .filter((a) => a.trim())
            )
          }
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1E2ED8] to-[#243BFF] text-white font-medium shadow-lg shadow-blue-900/30 hover:scale-105 hover:shadow-blue-700/40 transition-all duration-300"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl border border-[#334155] bg-[#161B2B] text-slate-300 hover:bg-[#2A2D3D] hover:text-white transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}