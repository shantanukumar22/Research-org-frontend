// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getBlogById } from "../services/getBlogById";

// const BlogDetail = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const data = await getBlogById(id);
//       if (data) setBlog(data);
//     };

//     fetchBlog();
//   }, [id]);

//   if (!blog) {
//     return <p className="p-5 text-center text-gray-500">Loading blog...</p>;
//   }

//   // Destructure fields from blog
//   const { title, content, image, name, avatar, date, user, tags, comments } =
//     blog;

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <h1 className="text-4xl font-bold mb-4">{title}</h1>
//       {image && (
//         <img
//           src={image}
//           alt="Blog"
//           className="w-full max-h-[400px] object-cover rounded mb-6"
//         />
//       )}
//       <div className="flex items-center mb-4">
//         {avatar && (
//           <img
//             src={avatar}
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full mr-3"
//           />
//         )}
//         <div>
//           <p className="text-lg font-semibold">{name || "Anonymous"}</p>
//           <p className="text-sm text-gray-500">
//             Posted on: {new Date(date).toLocaleDateString()}
//           </p>
//         </div>
//       </div>
//       <div
//         className="prose max-w-none"
//         dangerouslySetInnerHTML={{ __html: content }}
//       />

//       {tags && tags.length > 0 && (
//         <div className="mt-4">
//           <p className="font-semibold">Tags:</p>
//           <ul className="list-disc pl-5">
//             {tags.map((tag, index) => (
//               <li key={index} className="text-sm text-gray-700">
//                 {tag}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {comments && comments.length > 0 && (
//         <div className="mt-6">
//           <p className="font-semibold">Comments:</p>
//           <div>
//             {comments.map((comment, index) => (
//               <div key={index} className="border-t py-3">
//                 <div className="flex items-center mb-2">
//                   {comment.avatar && (
//                     <img
//                       src={comment.avatar}
//                       alt="User Avatar"
//                       className="w-8 h-8 rounded-full mr-3"
//                     />
//                   )}
//                   <div>
//                     <p className="font-semibold">
//                       {comment.name || "Anonymous"}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {new Date(comment.date).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//                 <p>{comment.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetail;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getBlogById } from "../services/getBlogById";
// import { likeBlog, unlikeBlog, addCommentToBlog } from "../services/BlogAction";

// const BlogDetail = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [likes, setLikes] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [currentUserId, setCurrentUserId] = useState(null); // To track logged in user

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const data = await getBlogById(id);
//       if (data) {
//         setBlog(data);
//         setLikes(data.likes || []);
//       }
//     };

//     const token = localStorage.getItem("token");
//     if (token) {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       setCurrentUserId(payload.user?.id);
//     }

//     fetchBlog();
//   }, [id]);

//   const handleLike = async () => {
//     const updatedLikes = await likeBlog(id);
//     if (updatedLikes) setLikes(updatedLikes);
//   };

//   const handleUnlike = async () => {
//     const updatedLikes = await unlikeBlog(id);
//     if (updatedLikes) setLikes(updatedLikes);
//   };

//   const handleCommentSubmit = async () => {
//     const updatedComments = await addCommentToBlog(id, newComment);
//     if (updatedComments) {
//       setBlog((prev) => ({ ...prev, comments: updatedComments }));
//       setNewComment("");
//     }
//   };

//   if (!blog) {
//     return <p className="p-5 text-center text-gray-500">Loading blog...</p>;
//   }

//   const { title, content, image, name, avatar, date, user, tags, comments } =
//     blog;

//   const hasLiked = likes.includes(currentUserId);

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <h1 className="text-4xl font-bold mb-4">{title}</h1>

//       {image && (
//         <img
//           src={image}
//           alt="Blog"
//           className="w-full max-h-[400px] object-cover rounded mb-6"
//         />
//       )}

//       <div className="flex items-center mb-4">
//         {avatar && (
//           <img
//             src={avatar}
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full mr-3"
//           />
//         )}
//         <div>
//           <p className="text-lg font-semibold">{name || "Anonymous"}</p>
//           <p className="text-sm text-gray-500">
//             Posted on: {new Date(date).toLocaleDateString()}
//           </p>
//         </div>
//       </div>

//       <div
//         className="prose max-w-none"
//         dangerouslySetInnerHTML={{ __html: content }}
//       />

//       {tags && tags.length > 0 && (
//         <div className="mt-4">
//           <p className="font-semibold">Tags:</p>
//           <ul className="list-disc pl-5">
//             {tags.map((tag, index) => (
//               <li key={index} className="text-sm text-gray-700">
//                 {tag}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="flex items-center gap-4 my-6">
//         <button
//           className={`px-4 py-1 rounded ${
//             hasLiked ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//           } text-white`}
//           onClick={handleLike}
//           disabled={hasLiked}
//         >
//           👍 Like ({likes.length})
//         </button>

//         <button
//           className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
//           onClick={handleUnlike}
//         >
//           👎 Unlike
//         </button>
//       </div>

//       {comments && comments.length > 0 && (
//         <div className="mt-6">
//           <p className="font-semibold">Comments:</p>
//           <div>
//             {comments.map((comment, index) => (
//               <div key={index} className="border-t py-3">
//                 <div className="flex items-center mb-2">
//                   {comment.avatar && (
//                     <img
//                       src={comment.avatar}
//                       alt="User Avatar"
//                       className="w-8 h-8 rounded-full mr-3"
//                     />
//                   )}
//                   <div>
//                     <p className="font-semibold">
//                       {comment.name || "Anonymous"}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {new Date(comment.date).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//                 <p>{comment.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="mt-6">
//         <p className="font-semibold mb-2">Add a comment:</p>
//         <textarea
//           className="w-full p-2 border rounded mb-2"
//           rows={3}
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write your comment..."
//         />
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           onClick={handleCommentSubmit}
//         >
//           Submit Comment
//         </button>
//       </div>
//     </div>
//   );
// };

// // export default BlogDetail;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getBlogById } from "../services/getBlogById";
// import { likeBlog, unlikeBlog, addCommentToBlog } from "../services/BlogAction";

// const BlogDetail = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [likes, setLikes] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [currentUserId, setCurrentUserId] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const data = await getBlogById(id);
//       if (data) {
//         setBlog(data);
//         setLikes(data.likes || []);
//       }
//     };

//     const token = localStorage.getItem("token");
//     if (token) {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       setCurrentUserId(payload.user?.id);
//     }

//     fetchBlog();
//   }, [id]);

//   const refreshBlog = async () => {
//     const data = await getBlogById(id);
//     if (data) {
//       setBlog(data);
//       setLikes(data.likes || []);
//     }
//   };

//   const handleLike = async () => {
//     const updatedLikes = await likeBlog(id);
//     if (updatedLikes) setLikes(updatedLikes);
//   };

//   const handleUnlike = async () => {
//     const updatedLikes = await unlikeBlog(id);
//     if (updatedLikes) setLikes(updatedLikes);
//   };

//   const handleCommentSubmit = async () => {
//     const updatedComments = await addCommentToBlog(id, newComment);
//     if (updatedComments) {
//       setBlog((prev) => ({ ...prev, comments: updatedComments }));
//       setNewComment("");
//     }
//   };

//   if (!blog) {
//     return <p className="p-5 text-center text-gray-500">Loading blog...</p>;
//   }

//   const { title, content, image, name, avatar, date, tags, comments } = blog;

//   const hasLiked = likes.some((like) => like.user === currentUserId);

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <h1 className="text-4xl font-bold mb-4">{title}</h1>

//       {image && (
//         <img
//           src={image}
//           alt="Blog"
//           className="w-full max-h-[400px] object-cover rounded mb-6"
//         />
//       )}

//       <div className="flex items-center mb-4">
//         {avatar && (
//           <img
//             src={avatar}
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full mr-3"
//           />
//         )}
//         <div>
//           <p className="text-lg font-semibold">{name || "Anonymous"}</p>
//           <p className="text-sm text-gray-500">
//             Posted on: {new Date(date).toLocaleDateString()}
//           </p>
//         </div>
//       </div>

//       <div
//         className="prose max-w-none"
//         dangerouslySetInnerHTML={{ __html: content }}
//       />

//       {tags && tags.length > 0 && (
//         <div className="mt-4">
//           <p className="font-semibold">Tags:</p>
//           <ul className="list-disc pl-5">
//             {tags.map((tag, index) => (
//               <li key={index} className="text-sm text-gray-700">
//                 {tag}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="flex items-center gap-4 my-6">
//         <button
//           className={`px-4 py-1 rounded ${
//             hasLiked ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//           } text-white`}
//           onClick={handleLike}
//           disabled={hasLiked}
//         >
//           👍 Like ({likes.length})
//         </button>

//         <button
//           className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
//           onClick={handleUnlike}
//         >
//           👎 Unlike
//         </button>
//       </div>

//       {comments && comments.length > 0 && (
//         <div className="mt-6">
//           <p className="font-semibold">Comments:</p>
//           <div>
//             {comments.map((comment, index) => (
//               <div key={index} className="border-t py-3">
//                 <div className="flex items-center mb-2">
//                   {comment.avatar && (
//                     <img
//                       src={comment.avatar}
//                       alt="User Avatar"
//                       className="w-8 h-8 rounded-full mr-3"
//                     />
//                   )}
//                   <div>
//                     <p className="font-semibold">
//                       {comment.name || "Anonymous"}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {new Date(comment.date).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//                 <p>{comment.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="mt-6">
//         <p className="font-semibold mb-2">Add a comment:</p>
//         <textarea
//           className="w-full p-2 border rounded mb-2"
//           rows={3}
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write your comment..."
//         />
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           onClick={handleCommentSubmit}
//         >
//           Submit Comment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BlogDetail;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getBlogById } from "../services/api";
// import { likeBlog, unlikeBlog, addCommentToBlog } from "../services/api";

// const BlogDetail = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLikeLoading, setIsLikeLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [likeCount, setLikeCount] = useState(0);
//   const [userHasLiked, setUserHasLiked] = useState(false);
//   const [likeError, setLikeError] = useState(null);

//   // Fetch blog and set up user data
//   useEffect(() => {
//     const fetchBlog = async () => {
//       setIsLoading(true);
//       try {
//         const data = await getBlogById(id);
//         if (data) {
//           setBlog(data);
//           setLikeCount(data.likes?.length || 0);

//           // Check if current user has liked this blog
//           const token = localStorage.getItem("token");
//           if (token) {
//             try {
//               const payload = JSON.parse(atob(token.split(".")[1]));
//               const userId = payload.user?.id || payload.id;
//               setCurrentUserId(userId);

//               // Set initial like status
//               const userLiked = data.likes?.some(
//                 (like) => like.user === userId
//               );
//               setUserHasLiked(!!userLiked);
//             } catch (error) {
//               console.error("Failed to decode token", error);
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const refreshBlog = async () => {
//     try {
//       const data = await getBlogById(id);
//       if (data) {
//         setBlog(data);

//         // Update like data
//         const updatedLikes = data.likes || [];
//         setLikeCount(updatedLikes.length);

//         // Update user's like status
//         const userLiked = updatedLikes.some(
//           (like) => like.user === currentUserId
//         );
//         setUserHasLiked(userLiked);
//       }
//     } catch (error) {
//       console.error("Error refreshing blog:", error);
//     }
//   };

//   const handleLike = async () => {
//     if (!currentUserId) {
//       alert("Please log in to like this blog");
//       return;
//     }

//     setIsLikeLoading(true);
//     setLikeError(null);

//     try {
//       // Update UI optimistically
//       const optimisticLikes = [...(blog.likes || [])];
//       if (!userHasLiked) {
//         optimisticLikes.push({ user: currentUserId });
//         setUserHasLiked(true);
//         setLikeCount(optimisticLikes.length);
//       }

//       // Make API call
//       const updatedLikes = await likeBlog(id);

//       // Update with actual data from server if available
//       if (updatedLikes) {
//         setLikeCount(updatedLikes.length);
//         // Check if current user's like is in the response
//         const userLiked = updatedLikes.some(
//           (like) => like.user === currentUserId
//         );
//         setUserHasLiked(userLiked);
//         setBlog((prev) => ({ ...prev, likes: updatedLikes }));
//       } else {
//         // If API call failed, refresh to get current state
//         await refreshBlog();
//       }
//     } catch (error) {
//       console.error("Error liking blog:", error);
//       setLikeError("Failed to like the post. Please try again.");
//       // Reset to previous state
//       await refreshBlog();
//     } finally {
//       setIsLikeLoading(false);
//     }
//   };

//   const handleUnlike = async () => {
//     if (!currentUserId) {
//       alert("Please log in to unlike this blog");
//       return;
//     }

//     setIsLikeLoading(true);
//     setLikeError(null);

//     try {
//       // Update UI optimistically
//       if (userHasLiked) {
//         const optimisticLikes = (blog.likes || []).filter(
//           (like) => like.user !== currentUserId
//         );
//         setUserHasLiked(false);
//         setLikeCount(optimisticLikes.length);
//       }

//       // Make API call
//       const updatedLikes = await unlikeBlog(id);

//       // Update with actual data from server if available
//       if (updatedLikes) {
//         setLikeCount(updatedLikes.length);
//         // Check if current user's like is still in the response
//         const userLiked = updatedLikes.some(
//           (like) => like.user === currentUserId
//         );
//         setUserHasLiked(userLiked);
//         setBlog((prev) => ({ ...prev, likes: updatedLikes }));
//       } else {
//         // If API call failed, refresh to get current state
//         await refreshBlog();
//       }
//     } catch (error) {
//       console.error("Error unliking blog:", error);
//       setLikeError("Failed to unlike the post. Please try again.");
//       // Reset to previous state
//       await refreshBlog();
//     } finally {
//       setIsLikeLoading(false);
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();

//     if (!newComment.trim()) {
//       return;
//     }

//     if (!currentUserId) {
//       alert("Please log in to comment");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const updatedComments = await addCommentToBlog(id, newComment.trim());
//       if (updatedComments) {
//         setBlog((prev) => ({ ...prev, comments: updatedComments }));
//       } else {
//         // If API call failed, refresh to get current state
//         await refreshBlog();
//       }
//       setNewComment("");
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-4xl mx-auto p-5 flex justify-center items-center min-h-[50vh]">
//         <div className="animate-pulse text-lg font-medium text-gray-600">
//           Loading blog...
//         </div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="max-w-4xl mx-auto p-5 text-center">
//         <h2 className="text-2xl font-bold text-red-500">Blog not found</h2>
//         <p className="mt-2 text-gray-600">
//           The blog you're looking for doesn't exist or has been removed.
//         </p>
//       </div>
//     );
//   }

//   const {
//     title,
//     content,
//     image,
//     name,
//     avatar,
//     date,
//     tags,
//     comments = [],
//   } = blog;
//   const formattedDate = date
//     ? new Date(date).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     : "Unknown date";

//   return (
//     <article className="max-w-5xl mx-auto p-5 bg-white shadow-sm rounded-lg">
//       {/* Blog Header */}
//       <header className="mb-8">
//         <h1 className="text-4xl font-bold mb-6 text-gray-800">{title}</h1>

//         {/* Author info */}
//         <div className="flex items-center mb-6">
//           {avatar ? (
//             <img
//               src={avatar}
//               alt={`${name || "Author"}'s avatar`}
//               className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200"
//             />
//           ) : (
//             <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
//               <span className="text-gray-600 font-bold text-lg">
//                 {(name || "A").charAt(0).toUpperCase()}
//               </span>
//             </div>
//           )}
//           <div>
//             <p className="text-lg font-medium text-gray-800">
//               {name || "Anonymous"}
//             </p>
//             <p className="text-sm text-gray-500">Posted on {formattedDate}</p>
//           </div>
//         </div>

//         {/* Featured Image */}
//         {image && (
//           <div className="mb-8">
//             <img
//               src={image}
//               alt={`Cover for ${title}`}
//               className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow"
//             />
//           </div>
//         )}
//       </header>

//       {/* Blog Content */}
//       <div
//         className="prose max-w-none mb-10 text-gray-700"
//         dangerouslySetInnerHTML={{ __html: content }}
//       />

//       {/* Tags */}
//       {tags && tags.length > 0 && (
//         <div className="mb-8">
//           <h3 className="font-semibold text-gray-700 mb-2">Tags:</h3>
//           <div className="flex flex-wrap gap-2">
//             {tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Like/Unlike Section */}
//       <div className="border-t border-b py-4 my-8">
//         <div className="flex flex-col">
//           <div className="flex items-center gap-4">
//             {userHasLiked ? (
//               <button
//                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 transition-colors"
//                 onClick={handleUnlike}
//                 disabled={isLikeLoading}
//               >
//                 {isLikeLoading ? (
//                   <span className="animate-pulse">⏳</span>
//                 ) : (
//                   <span className="text-xl">❤️</span>
//                 )}
//                 <span>Liked</span>
//                 <span className="font-medium ml-1">({likeCount})</span>
//               </button>
//             ) : (
//               <button
//                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 transition-colors"
//                 onClick={handleLike}
//                 disabled={isLikeLoading}
//               >
//                 {isLikeLoading ? (
//                   <span className="animate-pulse">⏳</span>
//                 ) : (
//                   <span className="text-xl">🤍</span>
//                 )}
//                 <span>Like</span>
//                 <span className="font-medium ml-1">({likeCount})</span>
//               </button>
//             )}

//             <a
//               href="#comments"
//               className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
//             >
//               <span className="text-xl">💬</span>
//               <span>Comments</span>
//               <span className="font-medium ml-1">({comments.length})</span>
//             </a>
//           </div>

//           {/* Like error message */}
//           {likeError && (
//             <div className="mt-2 text-red-600 text-sm">{likeError}</div>
//           )}
//         </div>
//       </div>

//       {/* Comments Section */}
//       <section id="comments" className="mb-8">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">
//           Comments ({comments.length})
//         </h2>

//         {/* Comment Form */}
//         <form onSubmit={handleCommentSubmit} className="mb-10">
//           <div className="mb-3">
//             <label
//               htmlFor="comment"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Add your thoughts
//             </label>
//             <textarea
//               id="comment"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//               rows={4}
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Write your comment..."
//               disabled={isSubmitting}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//             disabled={isSubmitting || !newComment.trim()}
//           >
//             {isSubmitting ? "Submitting..." : "Post Comment"}
//           </button>
//         </form>

//         {/* Comments List */}
//         <div className="space-y-6">
//           {comments.length === 0 ? (
//             <p className="text-center text-gray-500 py-8">
//               Be the first to comment on this post!
//             </p>
//           ) : (
//             comments.map((comment, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-lg ${
//                   index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 } border border-gray-200`}
//               >
//                 <div className="flex items-center mb-3">
//                   {comment.avatar ? (
//                     <img
//                       src={comment.avatar}
//                       alt={`${comment.name || "Commenter"}'s avatar`}
//                       className="w-10 h-10 rounded-full mr-3"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
//                       <span className="text-gray-600 font-bold">
//                         {(comment.name || "A").charAt(0).toUpperCase()}
//                       </span>
//                     </div>
//                   )}
//                   <div>
//                     <p className="font-medium text-gray-800">
//                       {comment.name || "Anonymous"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {comment.date
//                         ? new Date(comment.date).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                         : "Unknown date"}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-700">{comment.text}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </section>
//     </article>
//   );
// };

// export default BlogDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBlogById,
  likeBlog,
  unlikeBlog,
  addCommentToBlog,
} from "../services/api";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likeError, setLikeError] = useState(null);
  const [animateLike, setAnimateLike] = useState(false);

  // Fetch blog and set up user data
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const data = await getBlogById(id);
        if (data) {
          setBlog(data);
          setLikeCount(data.likes?.length || 0);

          // Check if current user has liked this blog
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const payload = JSON.parse(atob(token.split(".")[1]));
              const userId = payload.user?.id || payload.id;
              setCurrentUserId(userId);

              // Set initial like status
              const userLiked = data.likes?.some(
                (like) => like.user === userId
              );
              setUserHasLiked(!!userLiked);
            } catch (error) {
              console.error("Failed to decode token", error);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const refreshBlog = async () => {
    try {
      const data = await getBlogById(id);
      if (data) {
        setBlog(data);

        // Update like data
        const updatedLikes = data.likes || [];
        setLikeCount(updatedLikes.length);

        // Update user's like status
        const userLiked = updatedLikes.some(
          (like) => like.user === currentUserId
        );
        setUserHasLiked(userLiked);
      }
    } catch (error) {
      console.error("Error refreshing blog:", error);
    }
  };

  const handleLikeAction = async () => {
    if (!currentUserId) {
      alert("Please log in to interact with this post");
      return;
    }

    setIsLikeLoading(true);
    setLikeError(null);

    try {
      // Run animation
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 1000);

      // Optimistic UI update
      const newLikeStatus = !userHasLiked;
      setUserHasLiked(newLikeStatus);
      setLikeCount((prevCount) =>
        newLikeStatus ? prevCount + 1 : prevCount - 1
      );

      // API call based on new status
      const updatedLikes = newLikeStatus
        ? await likeBlog(id)
        : await unlikeBlog(id);

      if (updatedLikes) {
        // Update with server data
        setLikeCount(updatedLikes.length);
        const userLiked = updatedLikes.some(
          (like) => like.user === currentUserId
        );
        setUserHasLiked(userLiked);
        setBlog((prev) => ({ ...prev, likes: updatedLikes }));
      } else {
        // Reset if API failed
        await refreshBlog();
      }
    } catch (error) {
      console.error(
        `Error ${userHasLiked ? "unliking" : "liking"} blog:`,
        error
      );
      setLikeError(
        `Failed to ${
          userHasLiked ? "unlike" : "like"
        } the post. Please try again.`
      );
      await refreshBlog();
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    if (!currentUserId) {
      alert("Please log in to comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedComments = await addCommentToBlog(id, newComment.trim());
      if (updatedComments) {
        setBlog((prev) => ({ ...prev, comments: updatedComments }));
      } else {
        await refreshBlog();
      }
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-5 flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg font-medium text-gray-700">
            Loading blog post...
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-red-50 rounded-lg border border-red-100 shadow-sm">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Blog not found</h2>
        <p className="text-gray-700">
          The blog you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const {
    title,
    content,
    image,
    name,
    avatar,
    date,
    tags,
    comments = [],
  } = blog;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <article className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Blog Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 leading-tight">
          {title}
        </h1>

        {/* Author info */}
        <div className="flex items-center mb-8">
          {avatar ? (
            <img
              src={avatar}
              alt={`${name || "Author"}'s avatar`}
              className="w-14 h-14 rounded-full mr-4 border-2 border-gray-200 shadow"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 shadow">
              <span className="text-white font-bold text-xl">
                {(name || "A").charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="text-xl font-medium text-gray-800">
              {name || "Anonymous"}
            </p>
            <p className="text-sm text-gray-500">Posted on {formattedDate}</p>
          </div>
        </div>

        {/* Featured Image */}
        {image && (
          <div className="mb-10 rounded-xl overflow-hidden shadow-md">
            <img
              src={image}
              alt={`Cover for ${title}`}
              className="w-full h-auto max-h-[600px] object-cover transition-transform hover:scale-105 duration-700"
            />
          </div>
        )}
      </header>

      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none mb-12 text-gray-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mb-10">
          <h3 className="font-semibold text-gray-700 mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Like/Unlike Section */}
      <div className="border-t border-b py-6 my-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <button
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                userHasLiked
                  ? "bg-pink-100 text-pink-700 border border-pink-300 hover:bg-pink-200"
                  : "bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-gray-300"
              } ${animateLike ? "scale-110" : ""}`}
              onClick={handleLikeAction}
              disabled={isLikeLoading}
            >
              {isLikeLoading ? (
                <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mr-1"></div>
              ) : (
                <span
                  className={`text-2xl transition-transform ${
                    animateLike ? "scale-150" : ""
                  }`}
                >
                  {userHasLiked ? "❤️" : "🤍"}
                </span>
              )}
              <span className="font-medium">
                {userHasLiked ? "Liked" : "Like"}
              </span>
              <span className="font-medium ml-1 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                {likeCount}
              </span>
            </button>

            <a
              href="#comments"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 transition-colors"
            >
              <span className="text-xl">💬</span>
              <span className="font-medium">Comments</span>
              <span className="font-medium ml-1 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                {comments.length}
              </span>
            </a>

            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 transition-colors ml-auto"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
            >
              <span className="text-xl">🔗</span>
              <span className="font-medium">Share</span>
            </button>
          </div>

          {/* Like error message */}
          {likeError && (
            <div className="mt-3 text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-100">
              {likeError}
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <section id="comments" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <span className="text-xl">💬</span> Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="mb-12 bg-gray-50 p-6 rounded-xl border border-gray-200"
        >
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-md font-medium text-gray-700 mb-2"
            >
              Add your thoughts
            </label>
            <textarea
              id="comment"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              disabled={isSubmitting}
              required
            />
          </div>
          <button
            type="submit"
            className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 font-medium shadow-sm ${
              isSubmitting ? "opacity-75" : ""
            }`}
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <span>Post Comment</span>
              </>
            )}
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-4xl block mb-4">💭</span>
              <p className="text-gray-600 text-lg font-medium">
                Be the first to comment on this post!
              </p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl transition-all hover:shadow-md ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border border-gray-200`}
              >
                <div className="flex items-center mb-4">
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={`${comment.name || "Commenter"}'s avatar`}
                      className="w-12 h-12 rounded-full mr-3 border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center mr-3 shadow-sm">
                      <span className="text-white font-bold text-lg">
                        {(comment.name || "A").charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800 text-lg">
                      {comment.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {comment.date
                        ? new Date(comment.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Unknown date"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 pl-2 border-l-4 border-gray-200 py-1">
                  {comment.text}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </article>
  );
};

export default BlogDetail;
