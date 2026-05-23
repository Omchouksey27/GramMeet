export default function MeetingCard({ m, i18n, t, onEdit, onAttendance, onStatusUpdate, onDelete }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-800">{m.title}</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              m.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
              m.status === 'completed' ? 'bg-green-100 text-green-700' :
              'bg-red-100 text-red-700'
            }`}>
              {m.status}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
            <span>📅 {new Date(m.date).toLocaleString(
              i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
              { dateStyle: 'medium', timeStyle: 'short' }
            )}</span>
            <span>📍 {m.venue}</span>
          </div>
          {m.topics?.length > 0 && (
            <p className="text-xs text-gray-400 mt-1.5">📋 {m.topics.join(', ')}</p>
          )}
          {m.conclusion && (
            <p className="text-xs text-green-600 mt-1">✓ {m.conclusion}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() => onEdit(m)}
            className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onAttendance(m)}
            className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition"
          >
            ✅ Attendance
          </button>
          {m.status === 'upcoming' && (
            <button
              onClick={() => onStatusUpdate(m._id, 'completed')}
              className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition"
            >
              ✓ Mark Done
            </button>
          )}
          <button
            onClick={() => onDelete(m)}
            className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition"
          >
            🗑️ Remove
          </button>
        </div>
      </div>
    </div>
  );
}