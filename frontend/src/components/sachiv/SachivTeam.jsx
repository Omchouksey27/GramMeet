import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaCode,
} from 'react-icons/fa';

export default function SachivTeam() {

  const teamMembers = [
    {
      name: 'Lavkesh Chouksey',
      designation: 'Sachiv (Secretary)',
      description:
        'Manages all gram panchayat meetings, records, attendance and official documentation.',
      avatar:
        'https://scontent.fidr1-2.fna.fbcdn.net/v/t39.30808-6/504373419_3186288658194138_6329434379893574036_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=L_riWzjQ2gcQ7kNvwFNi-Rl&_nc_oc=AdqDsP7uABzU1ug9AYUEuxPJehJMlu1WtsaY1kNghVtL5FG1E6kphx5UYN_FRRBZyLdt_4F-QmjhqK-tB8fXoHgj&_nc_zt=23&_nc_ht=scontent.fidr1-2.fna&_nc_gid=eG3Ge7RoTAnM5VePzMm8Tg&_nc_ss=7b2a8&oh=00_Af5eiFchz-g7J0OQa56ZX_xpWz7leQwN1qbToXkn2Um1iw&oe=6A17210C',
      role: 'sachiv',
      badge: '🏛️',
    },
    {
      name: 'Shrashti Devi',
      designation: 'Sarpanch (Village Head)',
      description:
        'Elected head of the Gram Panchayat. Presides over all gram sabha meetings and decisions.',
      avatar:
        'https://scontent.fidr1-1.fna.fbcdn.net/v/t39.30808-6/460156364_1730511227685984_3726225591327570918_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=NT98vAquyhEQ7kNvwEU3Oyk&_nc_oc=Adp884_aSO4yjt0RMUXXJa69YYzW8OYUuiUPZqvCZx4LTH2JPlNSGK6_CJmZgmut4KH69ZUKpFTmcY4Eb_LYrQaG&_nc_zt=23&_nc_ht=scontent.fidr1-1.fna&_nc_gid=89Xh4FDOKAImpNAEzlW45Q&_nc_ss=7b2a8&oh=00_Af6RAlEKAGzDo5Ga48GdzhQiA6uPXi__2RMDuYsiAsFOZw&oe=6A171BA9',
      role: 'sarpanch',
      badge: '👑',
    },
    {
      name: 'Raju Prasad',
      designation: 'Ward Member — Ward 1',
      description:
        'Elected representative of Ward 1. Raises local issues in gram sabha and works for ward development.',
      avatar:
        'https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww',
      role: 'ward_member',
      badge: '🏘️',
    },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'sachiv':
        return 'from-blue-600 to-blue-800';
      case 'sarpanch':
        return 'from-indigo-600 to-indigo-800';
      default:
        return 'from-slate-600 to-slate-800';
    }
  };

 return (
  <div className="bg-[#f5f5f5] py-12 px-4 md:px-10">

    {/* Heading */}
    <div className="text-center mb-10">

      <h2 className="text-3xl md:text-4xl font-bold text-[#141619]">
        Our Team
      </h2>

      <p className="text-gray-500 mt-3 text-sm">
        Meet the people who manage and run the Gram Panchayat
      </p>

    </div>

    {/* Team Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto ">

      {teamMembers.map((member) => (

        <div
          key={member.name}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
        >

          {/* Top Color Strip */}
          <div
            className={`h-28 relative ${
              member.role === 'sachiv'
                ? 'bg-[#0A21C0]'
                : member.role === 'sarpanch'
                ? 'bg-[#2C2E3A]'
                : 'bg-[#141619]'
            }`}
          >

            {/* Avatar */}
            <div className="absolute left-1/2 -bottom-14 -translate-x-1/2">

              <img
                src={member.avatar}
                alt={member.name}
                className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg group-hover:scale-105 transition"
              />

            </div>

          </div>

          {/* Content */}
          <div className="pt-20 pb-8 px-6 text-center">

            <h3 className="text-lg font-bold text-[#141619]">
              {member.name}
            </h3>

            <p
              className={`text-sm mt-1 font-semibold ${
                member.role === 'sachiv'
                  ? 'text-[#0A21C0]'
                  : member.role === 'sarpanch'
                  ? 'text-[#2C2E3A]'
                  : 'text-gray-700'
              }`}
            >
              {member.designation}
            </p>

            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              {member.description}
            </p>

          </div>

        </div>

      ))}

    </div>

    {/* Developer Section */}
    <div className="max-w-6xl mx-auto mt-14">

      <div className="bg-[#141619] rounded-3xl overflow-hidden shadow-xl">

        <div className="grid md:grid-cols-2 items-center">

          {/* Left */}
          <div className="p-8 md:p-12 text-white">

            <div className="inline-block bg-[#0A21C0] text-xs px-4 py-1 rounded-full mb-4">
              Full Stack Developer
            </div>

            <h3 className="text-3xl font-bold">
              Om Chouksey
            </h3>

            <p className="text-blue-300 mt-2">
              Developer & Designer of GramMeet
            </p>

            <p className="text-gray-300 mt-5 leading-relaxed text-sm">
              Passionate about building digital solutions for rural governance.
              GramMeet improves transparency and efficiency in Gram Panchayat meetings.
            </p>

            {/* Tech */}
            <div className="flex flex-wrap gap-2 mt-6">

              {[
                'React',
                'Node.js',
                'MongoDB',
                'Express',
                'Tailwind',
                'Socket.io',
              ].map((tech) => (

                <span
                  key={tech}
                  className="bg-white/10 px-3 py-1 rounded-full text-xs"
                >
                  {tech}
                </span>

              ))}

            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-3 mt-6">

              <a
                href="mailto:omchouksey27@gmail.com"
                className="bg-[#0A21C0] hover:bg-blue-700 transition px-4 py-2 rounded-xl text-sm"
              >
                📧 Email
              </a>

            <div
                href="tel:9753481900"
                className="bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-xl text-sm"
              >📱 Contact No. - 9753481900
            </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="bg-[#2C2E3A] h-full flex items-center justify-center p-8">

            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQH2SZisOZ8EoA/profile-displayphoto-shrink_800_800/B4DZU9Cyv.HkAc-/0/1740485900333?e=1781136000&v=beta&t=WKhA6bJUqZ6JwwXgWiPBOfkK7U9oao7gd9QBzb-SN-E"
              alt="Om Chouksey"
              className="w-60 h-60 object-cover rounded-3xl shadow-2xl border-4 border-white/10"
            />

          </div>

        </div>

      </div>

    </div>

  </div>
);
}
// import omImg from '../../assets/team/om.png';
// import lavkeshImg from '../../assets/team/lavkesh.png';
// import shrashtiImg from '../../assets/team/shrashti.png';

// export default function SachivTeam() {

//   const teamMembers = [
//     {
//       name: 'Lavkesh Chouksey',
//       designation: 'Sachiv (Secretary)',
//       description:
//         'Manages all gram panchayat meetings, records, attendance and official documentation.',
//       avatar: lavkeshImg,
//       role: 'sachiv',
//       badge: '🏛️',
//     },

//     {
//       name: 'Shrashti Devi',
//       designation: 'Sarpanch (Village Head)',
//       description:
//         'Elected head of the Gram Panchayat. Presides over all gram sabha meetings and decisions.',
//       avatar: shrashtiImg,
//       role: 'sarpanch',
//       badge: '👑',
//     },

//     {
//       name: 'Raju Prasad',
//       designation: 'Ward Member — Ward 1',
//       description:
//         'Elected representative of Ward 1. Raises local issues in gram sabha and works for ward development.',
//       avatar:
//         'https://api.dicebear.com/7.x/initials/svg?seed=Raju+Prasad&backgroundColor=0369a1&fontFamily=Arial&fontSize=38',
//       role: 'ward_member',
//       badge: '🏘️',
//     },
//   ];

//   return (

//     <div className="bg-[#ECECEC] py-14 px-4 md:px-10 overflow-hidden">

//       {/* Heading */}
//       <div className="text-center mb-16">

//         <h2 className="text-3xl md:text-4xl font-bold text-[#141619]">
//           Our Team
//         </h2>

//         <p className="text-gray-500 text-sm mt-3">
//           Meet the people who manage and run the Gram Panchayat
//         </p>

//       </div>

//       {/* Team Section */}
//       <div className="max-w-7xl mx-auto">

//         {/* Blue Strip */}
//         <div className="bg-[#0A21C0] h-44 relative rounded-sm">

//           {/* Team Members */}
//           <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-around">

//             {teamMembers.map((member) => (

//               <div
//                 key={member.name}
//                 className="flex flex-col items-center text-center group mt-24 md:mt-0"
//               >

//                 {/* Person Image */}
//                 <div className="relative">

//                   <img
//                     src={member.avatar}
//                     alt={member.name}
//                     className={`${
//                       member.role === 'ward_member'
//                         ? 'w-36 h-36 rounded-full object-cover border-4 border-white'
//                         : 'w-44 h-56 object-contain'
//                     } grayscale group-hover:grayscale-0 hover:scale-105 transition duration-500 drop-shadow-2xl`}
//                   />

//                   {/* Badge */}
//                   <div className="absolute bottom-2 right-2 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-lg">
//                     {member.badge}
//                   </div>

//                 </div>

//                 {/* Content */}
//                 <div className="mt-6 max-w-[260px]">

//                   <h3 className="text-lg font-bold uppercase tracking-wide text-[#141619]">
//                     {member.name}
//                   </h3>

//                   <p className="text-[#0A21C0] font-semibold text-sm mt-1">
//                     {member.designation}
//                   </p>

//                   <p className="text-gray-500 text-sm mt-3 leading-relaxed">
//                     {member.description}
//                   </p>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//       </div>

//       {/* Spacer */}
//       <div className="h-[700px] md:h-72"></div>

//       {/* Developer Section */}
//       <div className="max-w-6xl mx-auto">

//         <div className="grid md:grid-cols-2 bg-[#141619] rounded-sm overflow-hidden shadow-2xl">

//           {/* Left Content */}
//           <div className="p-10 md:p-14 text-white flex flex-col justify-center">

//             <div className="inline-block bg-[#0A21C0] px-4 py-1 text-xs font-semibold tracking-wider uppercase rounded-full mb-5 w-fit">
//               Full Stack Developer
//             </div>

//             <h3 className="text-4xl font-black uppercase tracking-wide">
//               Om Chouksey
//             </h3>

//             <p className="text-blue-300 mt-3 text-sm uppercase tracking-widest">
//               Developer & Designer of GramMeet
//             </p>

//             <p className="text-gray-300 mt-6 leading-relaxed text-sm max-w-lg">
//               Passionate about building digital solutions for rural governance.
//               GramMeet helps improve transparency and efficiency in Gram Panchayat meetings.
//             </p>

//             {/* Tech Stack */}
//             <div className="flex flex-wrap gap-2 mt-7">

//               {[
//                 'React',
//                 'Node.js',
//                 'MongoDB',
//                 'Express',
//                 'Tailwind',
//                 'Socket.io',
//               ].map((tech) => (

//                 <span
//                   key={tech}
//                   className="bg-white/10 border border-white/10 px-3 py-1 rounded-sm text-xs uppercase tracking-wide"
//                 >
//                   {tech}
//                 </span>

//               ))}

//             </div>

//             {/* Buttons */}
//             <div className="flex flex-wrap gap-3 mt-8">

//               <a
//                 href="mailto:omchouksey27@gmail.com"
//                 className="bg-[#0A21C0] hover:bg-blue-700 transition px-5 py-3 text-sm uppercase tracking-wide"
//               >
//                 Email
//               </a>

//               <a
//                 href="tel:9753481900"
//                 className="border border-white/20 hover:bg-white/10 transition px-5 py-3 text-sm uppercase tracking-wide"
//               >
//                 Contact
//               </a>

//             </div>

//           </div>

//           {/* Right Image */}
//           <div className="bg-[#2C2E3A] flex items-center justify-center p-10">

//             <img
//               src={omImg}
//               alt="Om Chouksey"
//               className="w-72 h-80 object-contain grayscale hover:grayscale-0 hover:scale-105 transition duration-500 drop-shadow-2xl"
//             />

//           </div>

//         </div>

//       </div>

//       {/* Footer */}
//       <div className="text-center mt-10">

//         <p className="text-gray-500 text-xs tracking-wide">
//           🌾 GramMeet — Digitizing Gram Panchayat Meetings for a Better India
//         </p>

//       </div>

//     </div>

//   );
// }