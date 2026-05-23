import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from '../components/common/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'sachiv' ? '/sachiv' : '/member');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/40"
      >

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-700 to-emerald-600 text-white p-10 lg:p-14 relative overflow-hidden">
          
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-white/10 rounded-full"></div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="text-5xl font-black mb-4 leading-tight">
              🌾 GramMeet
            </h1>

            <p className="text-lg text-green-100 leading-relaxed">
              Smart digital platform for Gram Panchayat meetings,
              attendance, analytics, and governance management.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <p>Meeting Management</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <p>Attendance Tracking</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <p>Village Analytics Dashboard</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          
          {/* Top */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-1 text-sm">
                Login to continue your dashboard
              </p>
            </div>

            <LanguageToggle />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-5 bg-red-100 border border-red-300 text-red-600 text-sm px-4 py-3 rounded-xl"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                {t('email')}
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition"
                  required
                />
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-600 hover:to-emerald-500 text-white py-3 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
            >
              {t('login')}
              <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* Bottom */}
          <p className="text-center text-sm text-gray-500 mt-8">
            ग्राम पंचायत डिजिटल प्रबंधन प्रणाली
          </p>
        </div>
      </motion.div>
    </div>
  );
}