// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import api from '../../api/axios';

// export default function MeetingForm({ onSuccess, existing }) {
//   const { t } = useTranslation();
//   const [form, setForm] = useState(
//     existing
//       ? {
//           title: existing.title || '',
//           date: existing.date
//             ? new Date(existing.date).toISOString().slice(0, 16)
//             : '',
//           venue: existing.venue || '',
//           topics: existing.topics?.join(', ') || '',
//           description: existing.description || '',
//         }
//       : {
//           title: '',
//           date: '',
//           venue: '',
//           topics: '',
//           description: '',
//         }
//   );

//   // KEY FIX: submitting state prevents double clicks
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prevent double submit
//     if (submitting) return;

//     // Validate
//     if (!form.title.trim()) { setError('Meeting title is required'); return; }
//     if (!form.date) { setError('Date and time is required'); return; }
//     if (!form.venue.trim()) { setError('Venue is required'); return; }

//     setSubmitting(true);
//     setError('');
//     setSuccess('');

//     try {
//       const payload = {
//         ...form,
//         topics: form.topics
//           ? form.topics.split(',').map((s) => s.trim()).filter(Boolean)
//           : [],
//       };

//       if (existing) {
//         await api.put(`/meetings/${existing._id}`, payload);
//         setSuccess('Meeting updated successfully!');
//       } else {
//         await api.post('/meetings', payload);
//         setSuccess('Meeting scheduled successfully! Members will be notified.');
//         // Reset form after successful creation
//         setForm({ title: '', date: '', venue: '', topics: '', description: '' });
//       }

//       // Wait briefly so user sees success message then close
//       setTimeout(() => {
//         onSuccess?.();
//       }, 1200);

//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong. Try again.');
//       setSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Error message */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
//           <span>❌</span> {error}
//         </div>
//       )}

//       {/* Success message */}
//       {success && (
//         <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
//           <span>✅</span> {success}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Title */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-medium text-gray-600 mb-1">
//             Meeting Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="title"
//             className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="e.g. Monthly Gram Sabha"
//             value={form.title}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//         </div>

//         {/* Date */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">
//             Date & Time <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="datetime-local"
//             name="date"
//             className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={form.date}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//         </div>

//         {/* Venue */}
//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">
//             Venue <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="venue"
//             className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="e.g. Gram Panchayat Bhavan"
//             value={form.venue}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//         </div>

//         {/* Topics */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-medium text-gray-600 mb-1">
//             Topics (comma separated)
//           </label>
//           <input
//             type="text"
//             name="topics"
//             className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="e.g. Road repair, Water supply, School funds"
//             value={form.topics}
//             onChange={handleChange}
//             disabled={submitting}
//           />
//         </div>

//         {/* Description */}
//         <div className="md:col-span-2">
//           <label className="block text-xs font-medium text-gray-600 mb-1">
//             Description
//           </label>
//           <textarea
//             name="description"
//             className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="Brief description of the meeting..."
//             rows={3}
//             value={form.description}
//             onChange={handleChange}
//             disabled={submitting}
//           />
//         </div>
//       </div>

//       <div className="flex gap-3 pt-2">
//         <button
//           type="submit"
//           disabled={submitting}
//           className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition ${
//             submitting
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-green-700 text-white hover:bg-green-600 cursor-pointer'
//           }`}
//         >
//           {submitting ? (
//             <>
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               {existing ? 'Updating...' : 'Scheduling...'}
//             </>
//           ) : (
//             <>
//               {existing ? '💾 Update Meeting' : '📅 Schedule Meeting'}
//             </>
//           )}
//         </button>

//         {!submitting && (
//           <button
//             type="button"
//             onClick={() => onSuccess?.()}
//             className="border border-gray-300 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
//           >
//             {t('cancel')}
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }




import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiCalendar,
  FiMapPin,
  FiFileText,
  FiTag,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

import api from '../../api/axios';

export default function MeetingForm({ onSuccess, existing }) {
  const { t } = useTranslation();

  const [form, setForm] = useState(
    existing
      ? {
          title: existing.title || '',
          date: existing.date
            ? new Date(existing.date)
                .toISOString()
                .slice(0, 16)
            : '',
          venue: existing.venue || '',
          topics:
            existing.topics?.join(', ') || '',
          description:
            existing.description || '',
        }
      : {
          title: '',
          date: '',
          venue: '',
          topics: '',
          description: '',
        }
  );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!form.title.trim()) {
      setError('Meeting title is required');
      return;
    }

    if (!form.date) {
      setError('Date and time is required');
      return;
    }

    if (!form.venue.trim()) {
      setError('Venue is required');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...form,
        topics: form.topics
          ? form.topics
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      };

      if (existing) {
        await api.put(
          `/meetings/${existing._id}`,
          payload
        );

        setSuccess(
          'Meeting updated successfully!'
        );
      } else {
        await api.post('/meetings', payload);

        setSuccess(
          'Meeting scheduled successfully! Members will be notified.'
        );

        setForm({
          title: '',
          date: '',
          venue: '',
          topics: '',
          description: '',
        });
      }

      setTimeout(() => {
        onSuccess?.();
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong. Try again.'
      );

      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[30px] overflow-hidden shadow-2xl border border-gray-100"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#141619] via-[#2C2E3A] to-[#0A21C0] p-6 md:p-8 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {existing
                ? 'Update Meeting'
                : 'Schedule Meeting'}
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              Create and manage Gram Sabha
              meetings professionally
            </p>
          </div>

          <div className="hidden md:flex h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md items-center justify-center">
            <FiCalendar className="text-2xl" />
          </div>
        </div>
      </div>

      {/* BODY */}
      <form
        onSubmit={handleSubmit}
        className="p-5 md:p-8 space-y-6"
      >
        {/* ERROR */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-4 rounded-2xl flex items-start gap-3"
          >
            <FiAlertCircle className="text-lg mt-0.5 flex-shrink-0" />

            <span>{error}</span>
          </motion.div>
        )}

        {/* SUCCESS */}
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#0A21C0]/10 border border-[#0A21C0]/20 text-[#0A21C0] text-sm px-4 py-4 rounded-2xl flex items-start gap-3"
          >
            <FiCheckCircle className="text-lg mt-0.5 flex-shrink-0" />

            <span>{success}</span>
          </motion.div>
        )}

        {/* FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* TITLE */}
          <div className="lg:col-span-2">
            <label className="text-sm font-semibold text-[#141619] mb-2 flex items-center gap-2">
              <FiFileText className="text-[#0A21C0]" />
              Meeting Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={submitting}
              required
              placeholder="e.g. Monthly Gram Sabha"
              className="w-full bg-[#F7F8FC] border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0A21C0] transition"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm font-semibold text-[#141619] mb-2 flex items-center gap-2">
              <FiClock className="text-[#0A21C0]" />
              Date & Time
            </label>

            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              disabled={submitting}
              required
              className="w-full bg-[#F7F8FC] border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0A21C0] transition"
            />
          </div>

          {/* VENUE */}
          <div>
            <label className="text-sm font-semibold text-[#141619] mb-2 flex items-center gap-2">
              <FiMapPin className="text-[#0A21C0]" />
              Venue
            </label>

            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              disabled={submitting}
              required
              placeholder="e.g. Gram Panchayat Bhavan"
              className="w-full bg-[#F7F8FC] border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0A21C0] transition"
            />
          </div>

          {/* TOPICS */}
          <div className="lg:col-span-2">
            <label className="text-sm font-semibold text-[#141619] mb-2 flex items-center gap-2">
              <FiTag className="text-[#0A21C0]" />
              Topics (comma separated)
            </label>

            <input
              type="text"
              name="topics"
              value={form.topics}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Road repair, Water supply, School funds"
              className="w-full bg-[#F7F8FC] border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0A21C0] transition"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="lg:col-span-2">
            <label className="text-sm font-semibold text-[#141619] mb-2 flex items-center gap-2">
              <FiFileText className="text-[#0A21C0]" />
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Write meeting agenda or important information..."
              className="w-full bg-[#F7F8FC] border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0A21C0] transition resize-none"
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          {/* SUBMIT */}
          <motion.button
            whileHover={{
              scale: submitting ? 1 : 1.02,
            }}
            whileTap={{
              scale: submitting ? 1 : 0.98,
            }}
            type="submit"
            disabled={submitting}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-semibold transition-all shadow-lg ${
              submitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#0A21C0] to-[#243BFF] text-white hover:shadow-2xl'
            }`}
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                {existing
                  ? 'Updating...'
                  : 'Scheduling...'}
              </>
            ) : (
              <>
                <FiCalendar className="text-lg" />

                {existing
                  ? 'Update Meeting'
                  : 'Schedule Meeting'}
              </>
            )}
          </motion.button>

          {/* CANCEL */}
          {!submitting && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => onSuccess?.()}
              className="sm:w-[160px] flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 py-4 rounded-2xl text-sm font-semibold text-[#141619] transition"
            >
              <FiX />

              {t('cancel')}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}