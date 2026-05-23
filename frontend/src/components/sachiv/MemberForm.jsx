// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import api from '../../api/axios';

// export default function MemberForm({ onSuccess, existing }) {
//   const { t } = useTranslation();
//   const [form, setForm] = useState(
//     existing
//       ? {
//           name: existing.name || '',
//           email: existing.email || '',
//           mobile: existing.mobile || '',
//           role: existing.role || 'ward_member',
//           wardArea: existing.wardArea || '',
//         }
//       : {
//           name: '',
//           email: '',
//           mobile: '',
//           role: 'ward_member',
//           wardArea: '',
//           password: 'gramMeet@123',
//         }
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       if (existing) {
//         await api.put(`/members/${existing._id}`, form);
//       } else {
//         await api.post('/members', form);
//       }
//       onSuccess?.();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fields = [
//     { key: 'name', type: 'text', label: t('name'), required: true },
//     { key: 'email', type: 'email', label: t('email'), required: true },
//     { key: 'mobile', type: 'text', label: t('mobile'), required: true },
//     { key: 'wardArea', type: 'text', label: t('ward_area'), required: false },
//   ];

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {fields.map(({ key, type, label, required }) => (
//           <div key={key}>
//             <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
//             <input
//               type={type}
//               placeholder={label}
//               className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//               value={form[key]}
//               onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//               required={required}
//             />
//           </div>
//         ))}

//         <div>
//           <label className="block text-xs font-medium text-gray-600 mb-1">{t('role')}</label>
//           <select
//             className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={form.role}
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//           >
//             <option value="ward_member">Ward Member</option>
//             <option value="sarpanch">Sarpanch</option>
//           </select>
//         </div>

//         {!existing && (
//           <div>
//             <label className="block text-xs font-medium text-gray-600 mb-1">
//               Default Password
//             </label>
//             <input
//               type="text"
//               className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Member can change this after first login
//             </p>
//           </div>
//         )}
//       </div>

//       <div className="flex gap-3 pt-2">
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 disabled:opacity-50 transition"
//         >
//           {loading ? 'Saving...' : t('save')}
//         </button>
//         <button
//           type="button"
//           onClick={() => onSuccess?.()}
//           className="border border-gray-300 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
//         >
//           {t('cancel')}
//         </button>
//       </div>
//     </form>
//   );
// }



import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiLock,
  FiCheckCircle,
  FiX,
  FiAlertCircle,
  FiUsers,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

import api from '../../api/axios';

export default function MemberForm({
  onSuccess,
  existing,
}) {
  const { t } = useTranslation();

  const [form, setForm] = useState(
    existing
      ? {
          name: existing.name || '',
          email: existing.email || '',
          mobile: existing.mobile || '',
          role:
            existing.role || 'ward_member',
          wardArea:
            existing.wardArea || '',
        }
      : {
          name: '',
          email: '',
          mobile: '',
          role: 'ward_member',
          wardArea: '',
          password: 'gramMeet@123',
        }
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      if (existing) {
        await api.put(
          `/members/${existing._id}`,
          form
        );
      } else {
        await api.post('/members', form);
      }

      onSuccess?.();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      key: 'name',
      type: 'text',
      label: t('name'),
      icon: FiUser,
      required: true,
    },
    {
      key: 'email',
      type: 'email',
      label: t('email'),
      icon: FiMail,
      required: true,
    },
    {
      key: 'mobile',
      type: 'text',
      label: t('mobile'),
      icon: FiPhone,
      required: true,
    },
    {
      key: 'wardArea',
      type: 'text',
      label: t('ward_area'),
      icon: FiMapPin,
      required: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white rounded-[32px] border border-gray-100 shadow-2xl"
    >
      {/* FLOATING 3D BACKGROUND */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#0A21C0]/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#141619]/10 rounded-full blur-3xl"></div>

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute top-16 right-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0A21C0] to-[#243BFF] opacity-20 blur-sm"
      />

      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute bottom-20 left-8 w-16 h-16 rounded-full bg-[#141619] opacity-10 blur-sm"
      />

      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-[#141619] via-[#2C2E3A] to-[#0A21C0] p-6 md:p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {existing
                ? 'Update Member'
                : 'Add New Member'}
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              Manage Gram Sabha members
              professionally
            </p>
          </div>

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="hidden md:flex h-16 w-16 rounded-3xl bg-white/10 backdrop-blur-md items-center justify-center border border-white/10"
          >
            <FiUsers className="text-3xl text-white" />
          </motion.div>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative p-5 md:p-8 space-y-6"
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

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {fields.map(
            ({
              key,
              type,
              label,
              icon: Icon,
              required,
            }) => (
              <motion.div
                key={key}
                whileHover={{ y: -2 }}
                className={
                  key === 'wardArea'
                    ? 'lg:col-span-2'
                    : ''
                }
              >
                <label className="text-sm font-semibold text-[#141619] mb-2 flex items-center gap-2">
                  <Icon className="text-[#0A21C0]" />
                  {label}
                </label>

                <div className="relative">
                  <input
                    type={type}
                    placeholder={label}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [key]:
                          e.target.value,
                      })
                    }
                    required={required}
                    className="w-full bg-[#F7F8FC] border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0A21C0] transition-all"
                  />

                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>
              </motion.div>
            )
          )}

          {/* ROLE */}
          <motion.div whileHover={{ y: -2 }}>
            <label className="text-sm font-semibold text-[#141619] mb-2 flex items-center gap-2">
              <FiShield className="text-[#0A21C0]" />
              {t('role')}
            </label>

            <div className="relative">
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                  })
                }
                className="w-full appearance-none bg-[#F7F8FC] border border-gray-200 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0A21C0] transition-all"
              >
                <option value="ward_member">
                  Ward Member
                </option>

                <option value="sarpanch">
                  Sarpanch
                </option>
              </select>

              <FiShield className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A21C0]" />
            </div>
          </motion.div>

          {/* PASSWORD */}
          {!existing && (
            <motion.div whileHover={{ y: -2 }}>
              <label className="text-sm font-semibold text-[#141619] mb-2 flex items-center gap-2">
                <FiLock className="text-[#0A21C0]" />
                Default Password
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password:
                        e.target.value,
                    })
                  }
                  className="w-full bg-[#F7F8FC] border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-[#0A21C0] transition-all"
                />

                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Member can change this
                after first login
              </p>
            </motion.div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          {/* SAVE BUTTON */}
          <motion.button
            whileHover={{
              scale: loading ? 1 : 1.02,
            }}
            whileTap={{
              scale: loading ? 1 : 0.98,
            }}
            type="submit"
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-semibold transition-all shadow-xl ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#0A21C0] to-[#243BFF] text-white hover:shadow-2xl'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                Saving...
              </>
            ) : (
              <>
                <FiCheckCircle className="text-lg" />

                {t('save')}
              </>
            )}
          </motion.button>

          {/* CANCEL */}
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
        </div>
      </form>
    </motion.div>
  );
}