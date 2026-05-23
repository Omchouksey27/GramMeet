import { useState } from 'react';

export default function ConclusionEditor({ meeting, onSave, onCancel }) {
  const [conclusion, setConclusion] = useState(meeting.conclusion || '');
  const [actions, setActions] = useState(meeting.actionsTaken?.join('\n') || '');

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Update — {meeting.title}</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-500 block mb-1">Conclusion</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          rows={3}
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          placeholder="Write the conclusion..."
        />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-500 block mb-1">
          Actions Taken (one per line)
        </label>
        <textarea
          className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          rows={4}
          value={actions}
          onChange={(e) => setActions(e.target.value)}
          placeholder="Road repair assigned&#10;Water supply fixed"
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onSave(
            meeting._id,
            conclusion,
            actions.split('\n').filter((a) => a.trim())
          )}
          className="bg-green-700 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-600 transition"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="border px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}