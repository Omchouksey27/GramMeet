// import { useAuth } from '../../context/AuthContext';
// import { useTranslation } from 'react-i18next';

// export default function LanguageToggle() {
//   const { switchLanguage } = useAuth();
//   const { i18n } = useTranslation();

//   return (
//     <button
//       onClick={() => switchLanguage(i18n.language === 'hi' ? 'en' : 'hi')}
//       className="px-3 py-1 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
//     >
//       {i18n.language === 'hi' ? 'English' : 'हिंदी'}
//     </button>
//   );
// }

import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { switchLanguage } = useAuth();

  const { i18n } = useTranslation();

  const isHindi = i18n.language === 'hi';

  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={() =>
        switchLanguage(
          isHindi ? 'en' : 'hi'
        )
      }
      className="relative overflow-hidden group"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A21C0]/10 to-[#141619]/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl blur-xl"></div>

      {/* BUTTON */}
      <div className="relative flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-2xl border border-gray-200 bg-[#F7F8FC] hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300">
        
        {/* ICON */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#0A21C0]/20 blur-md rounded-full"></div>

          <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-[#141619] to-[#0A21C0] flex items-center justify-center shadow-md">
            <FiGlobe className="text-white text-sm" />
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col items-start leading-none">
          

          <span className="text-sm font-semibold text-[#141619]">
            {isHindi
              ? 'English'
              : 'हिंदी'}
          </span>
        </div>

        {/* ACTIVE INDICATOR */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="w-2 h-2 rounded-full bg-[#0A21C0]"
        />
      </div>
    </motion.button>
  );
}