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

const SectionPage = () => {
  const { sectionType } = useParams();
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
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition duration-300 flex flex-col relative group"
            >
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
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "Published recently"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionPage;
