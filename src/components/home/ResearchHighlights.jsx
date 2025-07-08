import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const stats = [
  { label: 'Research Papers', value: 150, suffix: '+' },
  { label: 'Global Partners', value: 50, suffix: '+' },
  { label: 'Research Projects', value: 75, suffix: '' },
  { label: 'Awards Received', value: 25, suffix: '+' }
];

const achievements = [
  {
    year: '2023',
    title: 'Breakthrough in Quantum Computing',
    description: 'Successfully demonstrated quantum supremacy in complex calculations.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3'
  },
  {
    year: '2023',
    title: 'AI Ethics Framework',
    description: 'Developed comprehensive guidelines for ethical AI development.',
    image: 'https://images.unsplash.com/photo-1677442136019-21c1edcb7648?ixlib=rb-4.0.3'
  },
  {
    year: '2022',
    title: 'Sustainable Energy Innovation',
    description: 'Patented new solar cell technology with 40% higher efficiency.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3'
  }
];

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-blue-600">
      {count}{suffix}
    </span>
  );
};

const ResearchHighlights = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Research Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to excellence has led to significant achievements in various research domains.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Timeline */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">
            Recent Achievements
          </h3>
          <div className="space-y-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center md:justify-between flex-col md:flex-row">
                  <div className="flex items-center space-x-4 md:w-1/2">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{achievement.year}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="mt-1 text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:w-1/3">
                    <img
                      src={achievement.image}
                      alt=""
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchHighlights; 