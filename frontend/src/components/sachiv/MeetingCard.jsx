// export default function MeetingCard({ m, i18n, t, onEdit, onAttendance, onStatusUpdate, onDelete }) {
//   return (
//     <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
//       <div className="flex justify-between items-start gap-4">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap">
//             <h3 className="font-semibold text-gray-800">{m.title}</h3>
//             <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//               m.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
//               m.status === 'completed' ? 'bg-green-100 text-green-700' :
//               'bg-red-100 text-red-700'
//             }`}>
//               {m.status}
//             </span>
//           </div>
//           <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
//             <span>📅 {new Date(m.date).toLocaleString(
//               i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
//               { dateStyle: 'medium', timeStyle: 'short' }
//             )}</span>
//             <span>📍 {m.venue}</span>
//           </div>
//           {m.topics?.length > 0 && (
//             <p className="text-xs text-gray-400 mt-1.5">📋 {m.topics.join(', ')}</p>
//           )}
//           {m.conclusion && (
//             <p className="text-xs text-green-600 mt-1">✓ {m.conclusion}</p>
//           )}
//         </div>

//         <div className="flex flex-col gap-2 shrink-0">
//           <button
//             onClick={() => onEdit(m)}
//             className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
//           >
//             ✏️ Edit
//           </button>
//           <button
//             onClick={() => onAttendance(m)}
//             className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition"
//           >
//             ✅ Attendance
//           </button>
//           {m.status === 'upcoming' && (
//             <button
//               onClick={() => onStatusUpdate(m._id, 'completed')}
//               className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition"
//             >
//               ✓ Mark Done
//             </button>
//           )}
//           <button
//             onClick={() => onDelete(m)}
//             className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition"
//           >
//             🗑️ Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ClipboardList,
  CheckCircle2,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

export default function MeetingCard({
  m,
  i18n,
  t,
  onEdit,
  onAttendance,
  onStatusUpdate,
  onDelete,
}) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-[#2337F5]/15 text-[#2337F5]";
      case "completed":
        return "bg-green-500/15 text-green-500";
      case "cancelled":
        return "bg-red-500/15 text-red-500";
      default:
        return "bg-gray-500/15 text-gray-500";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        bg-white
        rounded-[28px]
        p-6
        shadow-[0_10px_35px_rgba(0,0,0,0.08)]
        hover:shadow-[0_15px_45px_rgba(35,55,245,0.15)]
        border
        border-gray-100
        transition-all
        duration-300
      "
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-[#141619] break-words">
              {m.title}
            </h3>

            <span
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize ${getStatusStyle(
                m.status
              )}`}
            >
              {m.status}
            </span>
          </div>

          {/* Date & Venue */}
          <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-9 h-9 rounded-xl bg-[#2337F5]/10 flex items-center justify-center">
                <Calendar size={16} className="text-[#2337F5]" />
              </div>

              <span>
                {new Date(m.date).toLocaleString(
                  i18n.language === "hi" ? "hi-IN" : "en-IN",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-9 h-9 rounded-xl bg-[#2337F5]/10 flex items-center justify-center">
                <MapPin size={16} className="text-[#2337F5]" />
              </div>

              <span>{m.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      {m.topics?.length > 0 && (
        <div className="mt-5 p-4 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList size={18} className="text-[#2337F5]" />
            <span className="font-semibold text-[#141619]">
              Topics
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {m.topics.join(", ")}
          </p>
        </div>
      )}

      {/* Conclusion */}
      {m.conclusion && (
        <div className="mt-4 p-4 rounded-2xl bg-green-50 border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-green-600" />
            <span className="font-semibold text-green-700">
              Conclusion
            </span>
          </div>

          <p className="text-sm text-green-700">
            {m.conclusion}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => onEdit(m)}
          className="
            h-11
            rounded-xl
            bg-[#141619]
            text-white
            font-medium
            hover:bg-[#050A44]
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onAttendance(m)}
          className="
            h-11
            rounded-xl
            bg-[#2337F5]
            text-white
            font-medium
            hover:bg-[#1A2AE0]
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Users size={16} />
          Attendance
        </button>

        {m.status === "upcoming" && (
          <button
            onClick={() => onStatusUpdate(m._id, "completed")}
            className="
              h-11
              rounded-xl
              bg-green-600
              text-white
              font-medium
              hover:bg-green-700
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <CheckCircle2 size={16} />
            Done
          </button>
        )}

        <button
          onClick={() => onDelete(m)}
          className="
            h-11
            rounded-xl
            bg-red-600
            text-white
            font-medium
            hover:bg-red-700
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </motion.div>
  );
}