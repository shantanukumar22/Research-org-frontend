// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllBlogs } from "../services/getAllBlogs";
// import { deleteBlog } from "../services/BlogAction"; // Import the deleteBlog function

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getAllBlogs();
//         setBlogs(data);
//       } catch (err) {
//         setError("Failed to fetch blogs");
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleDelete = async (e, id) => {
//     e.preventDefault(); // Prevent navigation from Link
//     e.stopPropagation(); // Stop event bubbling

//     if (window.confirm("Are you sure you want to delete this blog post?")) {
//       try {
//         await deleteBlog(id);
//         // Remove the deleted blog from state
//         setBlogs(blogs.filter((blog) => blog._id !== id));
//       } catch (err) {
//         console.error("Error deleting blog:", err);
//         alert("Failed to delete blog post. Please try again.");
//       }
//     }
//   };

//   const handleEdit = (e, id) => {
//     e.preventDefault(); // Prevent navigation from Link
//     e.stopPropagation(); // Stop event bubbling
//     navigate(`/edit-blog/${id}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center text-red-500 p-6">{error}</div>;
//   }

//   return (
//     <div className="p-5 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Our Blog Posts</h1>
//         <Link
//           to="/create-blog"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-1"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//               clipRule="evenodd"
//             />
//           </svg>
//           New Post
//         </Link>
//       </div>

//       {blogs.length === 0 ? (
//         <div className="text-center p-10 bg-gray-50 rounded-lg">
//           <p className="text-gray-500 text-lg">
//             No blog posts found. Create your first post!
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition duration-300 flex flex-col relative group"
//             >
//               {/* Card Content as Link */}
//               <Link
//                 to={`/blogs/${blog._id}`}
//                 className="flex-grow flex flex-col"
//               >
//                 {blog.image ? (
//                   <img
//                     src={blog.image}
//                     alt={blog.title}
//                     className="w-full h-52 object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-16 w-16 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>
//                 )}

//                 <div className="p-5 flex-grow">
//                   <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                     {blog.title}
//                   </h2>
//                   <p className="text-gray-600 line-clamp-3 mb-4">
//                     {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}
//                     {blog.content.length > 150 && "..."}
//                   </p>
//                 </div>
//               </Link>

//               {/* Edit and Delete buttons - visible on hover */}
//               <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <button
//                   onClick={(e) => handleEdit(e, blog._id)}
//                   className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
//                   title="Edit blog"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-blue-600"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={(e) => handleDelete(e, blog._id)}
//                   className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
//                   title="Delete blog"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-red-600"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Footer with date or author info */}
//               <div className="p-4 border-t border-gray-100 text-sm text-gray-500 mt-auto">
//                 {blog.createdAt
//                   ? new Date(blog.createdAt).toLocaleDateString()
//                   : "Published recently"}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blogs;
// !!!!
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllBlogs } from "../services/api";
// import { deleteBlog } from "../services/api"; // Update the path as needed

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchBlogs = async () => {
//     try {
//       setIsLoading(true);
//       const data = await getAllBlogs();
//       setBlogs(data);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch blogs");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleDelete = async (e, id) => {
//     e.preventDefault(); // Prevent navigation from Link
//     e.stopPropagation(); // Stop event bubbling

//     if (window.confirm("Are you sure you want to delete this blog post?")) {
//       try {
//         const result = await deleteBlog(id);
//         if (result) {
//           // Remove the deleted blog from state
//           setBlogs(blogs.filter((blog) => blog._id !== id));
//         } else {
//           alert("Failed to delete blog post. Please try again.");
//         }
//       } catch (err) {
//         console.error("Error deleting blog:", err);
//         alert("Failed to delete blog post. Please try again.");
//       }
//     }
//   };

//   const handleEdit = (e, id) => {
//     e.preventDefault(); // Prevent navigation from Link
//     e.stopPropagation(); // Stop event bubbling
//     navigate(`/edit-blog/${id}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 p-6">
//         <p>{error}</p>
//         <button
//           onClick={fetchBlogs}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-5 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Our Blog Posts</h1>
//         <Link
//           to="/create-blog"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-1"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//               clipRule="evenodd"
//             />
//           </svg>
//           New Post
//         </Link>
//       </div>

//       {blogs.length === 0 ? (
//         <div className="text-center p-10 bg-gray-50 rounded-lg">
//           <p className="text-gray-500 text-lg">
//             No blog posts found. Create your first post!
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition duration-300 flex flex-col relative group"
//             >
//               {/* Card Content as Link */}
//               <Link
//                 to={`/blogs/${blog._id}`}
//                 className="flex-grow flex flex-col"
//               >
//                 {blog.image ? (
//                   <img
//                     src={blog.image}
//                     alt={blog.title}
//                     className="w-full h-52 object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src =
//                         "https://via.placeholder.com/400x200?text=No+Image";
//                     }}
//                   />
//                 ) : (
//                   <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-16 w-16 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>
//                 )}

//                 <div className="p-5 flex-grow">
//                   <h2 className="text-xl font-semibold mb-3 text-gray-800">
//                     {blog.title}
//                   </h2>
//                   <p className="text-gray-600 line-clamp-3 mb-4">
//                     {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}
//                     {blog.content.length > 150 && "..."}
//                   </p>
//                 </div>
//               </Link>

//               {/* Edit and Delete buttons - visible on hover */}
//               <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <button
//                   onClick={(e) => handleEdit(e, blog._id)}
//                   className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
//                   title="Edit blog"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-blue-600"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={(e) => handleDelete(e, blog._id)}
//                   className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
//                   title="Delete blog"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-red-600"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Footer with date or author info */}
//               <div className="p-4 border-t border-gray-100 text-sm text-gray-500 mt-auto">
//                 {blog.createdAt
//                   ? new Date(blog.createdAt).toLocaleDateString()
//                   : "Published recently"}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blogs;

import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs, deleteBlog } from "../services/api";
import { useAuth } from "../context/AuthContext"; // adjust the path if needed

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get logged-in user

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch blogs");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const result = await deleteBlog(id);
        if (result) {
          setBlogs(blogs.filter((blog) => blog._id !== id));
        } else {
          alert("Failed to delete blog post. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("Failed to delete blog post. Please try again.");
      }
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit-blog/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        <p>{error}</p>
        <button
          onClick={fetchBlogs}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Our Blog Posts</h1>
        <Link
          to="/create-blog"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No blog posts found. Create your first post!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition duration-300 flex flex-col relative group"
            >
              <Link
                to={`/blogs/${blog._id}`}
                className="flex-grow flex flex-col"
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
              </Link>

              {currentUser?.role === "admin" && (
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => handleEdit(e, blog._id)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
                    title="Edit blog"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, blog._id)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
                    title="Delete blog"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <div className="p-4 border-t border-gray-100 text-sm text-gray-500 mt-auto">
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "Published recently"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
