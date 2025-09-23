import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deleteBlog } from '../../services/api';

const BlogCard = ({ blog, index, onDelete }) => {
  const { currentUser } = useAuth();
  if (!blog) return null;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        const success = await deleteBlog(blog._id);
        if (success && onDelete) {
          onDelete(blog._id);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 relative"
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
        {blog.image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={blog.image}
              alt=""
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {blog.section}
            </span>
          </div>
        )}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {blog.content?.replace(/<[^>]+>/g, '') || ''}
          </p>
          <div className="flex items-center justify-between">
            <time className="text-sm text-gray-500">
              {new Date(blog.createdAt || blog.date).toLocaleDateString()}
            </time>
            <span className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center group">
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
      </Link>
    </motion.article>
  );
};

const SectionTitle = ({ title, count }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    <span className="text-sm text-gray-500">{count} articles</span>
  </div>
);

const FeaturedGrid = ({ researchBlogs, publicationBlogs, eventBlogs, onBlogDelete }) => {
  return (
    <section className="py-12">
      <div className="space-y-12">
        {/* Research Section */}
        {researchBlogs?.length > 0 && (
          <div>
            <SectionTitle title="Latest Research" count={researchBlogs.length} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchBlogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} onDelete={onBlogDelete} />
              ))}
            </div>
          </div>
        )}

        {/* Publications Section */}
        {publicationBlogs?.length > 0 && (
          <div>
            <SectionTitle title="Recent Publications" count={publicationBlogs.length} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publicationBlogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} onDelete={onBlogDelete} />
              ))}
            </div>
          </div>
        )}

        {/* Events Section */}
        {eventBlogs?.length > 0 && (
          <div>
            <SectionTitle title="Upcoming Events" count={eventBlogs.length} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventBlogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} onDelete={onBlogDelete} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedGrid; 