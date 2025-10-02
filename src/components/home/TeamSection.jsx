import { motion } from 'framer-motion';

const team = [
  {
    name: 'Mahesh Kumar Gaur',
    role: 'Chairperson',
    image: '', // Will be added later
    specialization: 'Leadership & Governance',
    social: {
      twitter: '#',
      linkedin: '#',
      scholar: '#'
    }
  },
  {
    name: 'Rajendra Ravi',
    role: 'Director',
    image: '', // Will be added later
    specialization: 'Strategic Planning',
    social: {
      twitter: '#',
      linkedin: '#',
      scholar: '#'
    }
  },
  {
    name: 'Geeta Ravikirti',
    role: 'Treasurer',
    image: '', // Will be added later
    specialization: 'Financial Management',
    social: {
      twitter: '#',
      linkedin: '#',
      scholar: '#'
    }
  },
  {
    name: 'Mamta',
    role: 'Member',
    image: '', // Will be added later
    specialization: 'Board Member',
    social: {
      twitter: '#',
      linkedin: '#',
      scholar: '#'
    }
  },
  {
    name: 'Tarun Kanti Bose',
    role: 'Member',
    image: '', // Will be added later
    specialization: 'Board Member',
    social: {
      twitter: '#',
      linkedin: '#',
      scholar: '#'
    }
  },
  {
    name: 'Suraj Kumar',
    role: 'Member',
    image: '', // Will be added later
    specialization: 'Board Member',
    social: {
      twitter: '#',
      linkedin: '#',
      scholar: '#'
    }
  },
  {
    name: 'Basant Kumar Hetamsaria',
    role: 'Member',
    image: '', // Will be added later
    specialization: 'Board Member',
    social: {
      twitter: '#',
      linkedin: '#',
      scholar: '#'
    }
  }
];

const TeamMemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
    <div className="relative group">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-6xl font-bold text-blue-600">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-center space-x-3">
            <a
              href={member.social.twitter}
              className="p-2 text-white hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a
              href={member.social.linkedin}
              className="p-2 text-white hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={member.social.scholar}
              className="p-2 text-white hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                <path d="M10.5 7.5v9h3v-9h-3zm0-3v2h3v-2h-3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
      <p className="text-blue-600 font-medium mt-1">{member.role}</p>
      <div className="mt-4">
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>{member.specialization}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const TeamSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Governing Board Members
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our dedicated governing board members who guide the Institute for Democracy and Sustainability towards its mission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="/team"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            View All Board Members
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection; 