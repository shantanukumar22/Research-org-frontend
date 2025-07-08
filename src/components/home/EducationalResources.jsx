import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EducationalResources = ({ blogs }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Educational Resources
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Explore our curated collection of educational materials, research papers, and learning resources.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {blogs.map((blog, index) => (
          <motion.article
            key={blog._id}
            variants={item}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/blogs/${blog._id}`} className="block h-full">
              <div className="md:flex">
                {blog.image && (
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full md:h-full md:w-48 object-cover"
                      src={blog.image}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {blog.section}
                    </span>
                    <time className="text-sm text-gray-500 ml-2">
                      {new Date(blog.createdAt || blog.date).toLocaleDateString()}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {blog.content?.replace(/<[^>]+>/g, '') || ''}
                  </p>
                  <div className="mt-4">
                    <span className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group">
                      Read more
                      <svg
                        className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default EducationalResources; 