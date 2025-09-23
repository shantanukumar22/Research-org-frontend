// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const SectionPage = () => {
//   const { sectionType } = useParams();
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const res = await fetch(
//         `http://localhost:5000/api/blogs/section/${sectionType}`
//       );
//       const data = await res.json();
//       setBlogs(data);
//     };

//     fetchBlogs();
//   }, [sectionType]);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4 capitalize">
//         {sectionType} Posts
//       </h2>
//       {blogs.map((blog) => (
//         <div key={blog._id} className="border p-4 mb-2 rounded shadow">
//           <h3 className="text-xl font-semibold">{blog.title}</h3>
//           <p>{blog.content.slice(0, 150)}...</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SectionPage;
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteBlog } from "../services/api";

const SectionPage = () => {
  const { sectionType } = useParams();
  const { currentUser } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://research-org-backend.vercel.app/api/blogs/section/" + sectionType
        );
        const data = await res.json();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch section blogs");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [sectionType]);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        const success = await deleteBlog(blogId);
        if (success) {
          setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4  text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
        {sectionType} Posts
      </h1>

      {blogs.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No blog posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const canEditOrDelete = currentUser && (
              currentUser.role === 'admin' || 
              (blog.author && blog.author._id === currentUser._id) ||
              (blog.user && blog.user === currentUser._id)
            );

            return (
              <div
                key={blog._id}
                className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition duration-300 flex flex-col relative group"
              >
                {/* Action buttons for authorized users */}
                {canEditOrDelete && (
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    <Link
                      to={`/edit-blog/${blog._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors shadow-lg"
                      title="Edit blog"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
                      title="Delete blog"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
                
                <Link to={`/blogs/${blog._id}`} className="flex-grow">
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}

              <div className="p-5 flex-grow">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}
                  {blog.content.length > 150 && "..."}
                </p>
              </div>

                  <div className="p-4 border-t border-gray-100 text-sm text-gray-500 mt-auto">
                    {(blog.date || blog.createdAt)
                      ? new Date(blog.date || blog.createdAt).toLocaleDateString()
                      : "Published recently"}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SectionPage;
