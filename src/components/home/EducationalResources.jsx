import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deleteBlog } from '../../services/api';

const EducationalResources = ({ blogs, onBlogDelete }) => {
  const { currentUser } = useAuth();
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
        {blogs.map((blog, index) => {
          const handleDelete = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
              try {
                const success = await deleteBlog(blog._id);
                if (success && onBlogDelete) {
                  onBlogDelete(blog._id);
                }
              } catch (error) {
                console.error('Error deleting blog:', error);
                alert('Failed to delete blog. Please try again.');
              }
            }
          };

          const canEditOrDelete = currentUser && (
            currentUser.role === 'admin' || 
            (blog.author && blog.author._id === currentUser._id) ||
            (blog.user && blog.user === currentUser._id)
          );

          return (
            <motion.article
              key={blog._id}
              variants={item}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* Action buttons for authorized users */}
              {canEditOrDelete && (
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <Link
                    to={`/edit-blog/${blog._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors shadow-lg"
                    title="Edit blog"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
                    title="Delete blog"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
              
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
          );
        })}
      </motion.div>
    </section>
  );
};

export default EducationalResources; 