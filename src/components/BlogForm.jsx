// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";

// const BlogForm = () => {
//   const { currentUser, isAuthenticated } = useAuth();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null);

//   // Initialize Quill editor via the custom hook
//   const { quill, quillRef } = useQuill({
//     modules: {
//       toolbar: [
//         [{ header: [1, 2, 3, false] }],
//         ["bold", "italic", "underline"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link", "image"],
//         ["clean"],
//       ],
//     },
//   });

//   // Handle image selection
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // Handle blog submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isAuthenticated || currentUser.role !== "admin") {
//       alert("Access denied. Admins only.");
//       return;
//     }

//     // Add the content from the Quill editor to the FormData
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", quill.root.innerHTML); // Use Quill's innerHTML as content
//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/add`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Blog posted successfully!");
//         setTitle("");
//         setContent("");
//         setImage(null);
//       } else {
//         alert(data.msg || "Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   useEffect(() => {
//     if (quill) {
//       quill.on("text-change", () => {
//         const htmlContent = quill.root.innerHTML;
//         setContent(htmlContent); // Update content state when the editor's text changes
//       });
//     }
//   }, [quill]);

//   return (
//     <div className="max-w-3xl mx-auto p-5">
//       <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>

//       {!isAuthenticated ? (
//         <p className="text-red-500">Please log in to create a blog.</p>
//       ) : currentUser.role !== "admin" ? (
//         <p className="text-red-500">Access denied. Admins only.</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="font-medium">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="font-medium">Content</label>
//             <div ref={quillRef} style={{ height: "300px" }} />
//           </div>

//           <div>
//             <label className="font-medium">Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//           >
//             Post Blog
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// // export default BlogForm;
// import React, { useEffect, useState, useCallback } from "react";
// import { useQuill } from "react-quilljs";
// import { useAuth } from "../context/AuthContext";
// import "quill/dist/quill.snow.css";

// const BlogForm = () => {
//   const { currentUser, isAuthenticated } = useAuth();
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [content, setContent] = useState("");

//   const { quill, quillRef } = useQuill({
//     modules: {
//       toolbar: {
//         container: [
//           [{ header: [1, 2, 3, false] }],
//           ["bold", "italic", "underline"],
//           [{ list: "ordered" }, { list: "bullet" }],
//           ["link", "image"],
//           ["clean"],
//         ],
//         handlers: {
//           image: () => {}, // Placeholder, will override in useEffect
//         },
//       },
//     },
//   });

//   const imageHandler = useCallback(() => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_API_URL}/api/blogs/upload/wysiwyg-image`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: formData,
//           }
//         );

//         const data = await res.json();
//         if (res.ok) {
//           if (!quill) return console.error("Quill not initialized");

//           const range = quill.getSelection(true);
//           const index = range?.index ?? quill.getLength();
//           quill.insertEmbed(range.index, "image", data.imageUrl); // this will now be cloudinary url          quill.setSelection(index + 1);
//         } else {
//           alert(data.msg || "Image upload failed");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Image upload error");
//       }
//     };
//   }, [quill]);

//   useEffect(() => {
//     if (quill) {
//       quill.on("text-change", () => {
//         setContent(quill.root.innerHTML);
//       });

//       // Override image handler once quill is ready
//       const toolbar = quill.getModule("toolbar");
//       if (toolbar) {
//         toolbar.addHandler("image", imageHandler);
//       }
//     }
//   }, [quill, imageHandler]);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isAuthenticated || currentUser.role !== "admin") {
//       alert("Admins only");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", quill.root.innerHTML);
//     if (image) formData.append("image", image);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/add`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Blog posted");
//         setTitle("");
//         setImage(null);
//       } else {
//         alert(data.msg || "Error");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-5">
//       <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>
//       {!isAuthenticated ? (
//         <p className="text-red-500">Please log in to create a blog.</p>
//       ) : currentUser.role !== "admin" ? (
//         <p className="text-red-500">Access denied. Admins only.</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="font-medium">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="font-medium">Content</label>
//             <div ref={quillRef} style={{ height: "300px" }} />
//           </div>
//           <div>
//             <label className="font-medium">Thumbnail Image</label>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//           >
//             Post Blog
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default BlogForm;

// ! working everythinh
// import React, { useEffect, useState, useCallback } from "react";
// import { useQuill } from "react-quilljs";
// import { useAuth } from "../context/AuthContext";
// import "quill/dist/quill.snow.css";

// const BlogForm = () => {
//   const { currentUser, isAuthenticated } = useAuth();
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [content, setContent] = useState("");
//   const [section, setSection] = useState("blog");
//   const [tags, setTags] = useState("");

//   const { quill, quillRef } = useQuill({
//     modules: {
//       toolbar: {
//         container: [
//           [{ header: [1, 2, 3, false] }],
//           ["bold", "italic", "underline"],
//           [{ list: "ordered" }, { list: "bullet" }],
//           ["link", "image"],
//           ["clean"],
//         ],
//         handlers: {
//           image: () => {}, // Placeholder, overridden in useEffect
//         },
//       },
//     },
//   });

//   const imageHandler = useCallback(() => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_API_URL}/api/blogs/upload/wysiwyg-image`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: formData,
//           }
//         );

//         const data = await res.json();
//         if (res.ok) {
//           if (!quill) return console.error("Quill not initialized");

//           const range = quill.getSelection(true);
//           const index = range?.index ?? quill.getLength();
//           quill.insertEmbed(index, "image", data.imageUrl);
//           quill.setSelection(index + 1);
//         } else {
//           alert(data.msg || "Image upload failed");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Image upload error");
//       }
//     };
//   }, [quill]);

//   useEffect(() => {
//     if (quill) {
//       quill.on("text-change", () => {
//         setContent(quill.root.innerHTML);
//       });

//       const toolbar = quill.getModule("toolbar");
//       if (toolbar) {
//         toolbar.addHandler("image", imageHandler);
//       }
//     }
//   }, [quill, imageHandler]);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isAuthenticated || currentUser.role !== "admin") {
//       alert("Admins only");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", quill.root.innerHTML);
//     formData.append("tags", tags);
//     formData.append("section",section)
//     if (image) formData.append("image", image);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/add`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Blog posted");
//         setTitle("");
//         setSection("")
//         setImage(null);
//         setTags("");
//       } else {
//         alert(data.msg || "Error");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-5">
//       <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>
//       {!isAuthenticated ? (
//         <p className="text-red-500">Please log in to create a blog.</p>
//       ) : currentUser.role !== "admin" ? (
//         <p className="text-red-500">Access denied. Admins only.</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="font-medium">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="font-medium">Tags (comma separated)</label>
//             <input
//               type="text"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               className="w-full border p-2 rounded"
//               placeholder="e.g. react, javascript, webdev"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Section</label>
//             <select
//               value={section}
//               onChange={(e) => setSection(e.target.value)}
//               className="w-full border rounded-md p-2"
//             >
//               <option value="blog">Blog</option>
//               <option value="research">Research</option>
//               <option value="publication">Publication</option>
//               <option value="event">Event</option>
//             </select>
//           </div>
//           <div>
//             <label className="font-medium">Content</label>
//             <div ref={quillRef} style={{ height: "300px" }} />
//           </div>
//           <div>
//             <label className="font-medium">Thumbnail Image</label>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//           >
//             Post Blog
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default BlogForm;

// import React, { useEffect, useState, useCallback } from "react";
// import { useQuill } from "react-quilljs";
// import { useAuth } from "../context/AuthContext";
// import "quill/dist/quill.snow.css";

// const BlogForm = () => {
//   const { currentUser, isAuthenticated } = useAuth();
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [content, setContent] = useState("");
//   const [section, setSection] = useState("blog");
//   const [tags, setTags] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({
//     show: false,
//     type: "",
//     message: "",
//   });

//   const { quill, quillRef } = useQuill({
//     modules: {
//       toolbar: {
//         container: [
//           [{ header: [1, 2, 3, false] }],
//           ["bold", "italic", "underline", "strike"],
//           [{ color: [] }, { background: [] }],
//           [
//             { list: "ordered" },
//             { list: "bullet" },
//             { indent: "-1" },
//             { indent: "+1" },
//           ],
//           ["blockquote", "code-block"],
//           ["link", "image"],
//           ["clean"],
//         ],
//         handlers: {
//           image: () => {}, // Placeholder, overridden in useEffect
//         },
//       },
//     },
//     placeholder: "Write your amazing content here...",
//     theme: "snow",
//   });

//   const imageHandler = useCallback(() => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         setNotification({
//           show: true,
//           type: "info",
//           message: "Uploading image...",
//         });
//         const res = await fetch(
//           `${import.meta.env.VITE_API_URL}/api/blogs/upload/wysiwyg-image`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: formData,
//           }
//         );

//         const data = await res.json();
//         if (res.ok) {
//           if (!quill) return console.error("Quill not initialized");

//           const range = quill.getSelection(true);
//           const index = range?.index ?? quill.getLength();
//           quill.insertEmbed(index, "image", data.imageUrl);
//           quill.setSelection(index + 1);
//           setNotification({
//             show: true,
//             type: "success",
//             message: "Image added successfully",
//           });
//         } else {
//           setNotification({
//             show: true,
//             type: "error",
//             message: data.msg || "Image upload failed",
//           });
//         }
//       } catch (err) {
//         console.error(err);
//         setNotification({
//           show: true,
//           type: "error",
//           message: "Server error during image upload",
//         });
//       } finally {
//         setTimeout(
//           () => setNotification({ show: false, type: "", message: "" }),
//           3000
//         );
//       }
//     };
//   }, [quill]);

//   useEffect(() => {
//     if (quill) {
//       quill.on("text-change", () => {
//         setContent(quill.root.innerHTML);
//       });

//       const toolbar = quill.getModule("toolbar");
//       if (toolbar) {
//         toolbar.addHandler("image", imageHandler);
//       }
//     }
//   }, [quill, imageHandler]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);

//       // Create image preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const resetForm = () => {
//     setTitle("");
//     setSection("blog");
//     setImage(null);
//     setImagePreview(null);
//     setTags("");
//     if (quill) {
//       quill.setContents([]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isAuthenticated || currentUser.role !== "admin") {
//       setNotification({
//         show: true,
//         type: "error",
//         message: "Authorization required",
//       });
//       setTimeout(
//         () => setNotification({ show: false, type: "", message: "" }),
//         3000
//       );
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", quill.root.innerHTML);
//     formData.append("tags", tags);
//     formData.append("section", section);
//     if (image) formData.append("image", image);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/add`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setNotification({
//           show: true,
//           type: "success",
//           message: "Blog post published successfully!",
//         });
//         resetForm();
//       } else {
//         setNotification({
//           show: true,
//           type: "error",
//           message: data.msg || "Error publishing blog post",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       setNotification({
//         show: true,
//         type: "error",
//         message: "Server error occurred",
//       });
//     } finally {
//       setIsSubmitting(false);
//       setTimeout(
//         () => setNotification({ show: false, type: "", message: "" }),
//         5000
//       );
//     }
//   };

//   const NotificationBanner = () => {
//     if (!notification.show) return null;

//     const bgColors = {
//       success: "bg-green-100 border-green-500 text-green-700",
//       error: "bg-red-100 border-red-500 text-red-700",
//       info: "bg-blue-100 border-blue-500 text-blue-700",
//     };

//     return (
//       <div
//         className={`mb-4 px-4 py-3 rounded border-l-4 ${
//           bgColors[notification.type]
//         }`}
//         role="alert"
//       >
//         <p>{notification.message}</p>
//       </div>
//     );
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//         <div className="text-center py-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Authentication Required
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Please log in to create a blog post.
//           </p>
//           <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (currentUser.role !== "admin") {
//     return (
//       <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//         <div className="text-center py-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Access Restricted
//           </h2>
//           <p className="text-gray-600">
//             Only administrators can create blog posts.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
//         Create New Content
//       </h1>

//       <NotificationBanner />

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Title *
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//               placeholder="Enter blog title"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Content Type *
//             </label>
//             <select
//               value={section}
//               onChange={(e) => setSection(e.target.value)}
//               className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             >
//               <option value="blog">Blog Post</option>
//               <option value="research">Research Article</option>
//               <option value="publication">Publication</option>
//               <option value="event">Event Announcement</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Tags{" "}
//             <span className="text-gray-500 text-xs">(comma separated)</span>
//           </label>
//           <input
//             type="text"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             placeholder="e.g. technology, ai, web development"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Content *
//           </label>
//           <div className="border border-gray-300 rounded-md">
//             <div ref={quillRef} style={{ minHeight: "400px" }} />
//           </div>
//         </div>

//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Thumbnail Image
//           </label>
//           <div className="flex flex-col md:flex-row items-start gap-6">
//             <div className="flex-grow">
//               <div className="flex items-center gap-2">
//                 <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition">
//                   <span>Choose File</span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </label>
//                 <span className="text-sm text-gray-500">
//                   {image ? image.name : "No file chosen"}
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">
//                 Recommended: 1200 x 630 pixels, JPG or PNG format
//               </p>
//             </div>

//             {imagePreview && (
//               <div className="w-48 h-32 relative">
//                 <img
//                   src={imagePreview}
//                   alt="Thumbnail preview"
//                   className="w-full h-full object-cover rounded-md border border-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setImage(null);
//                     setImagePreview(null);
//                   }}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex gap-4 pt-4 border-t">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`px-6 py-2 rounded-md text-white font-medium ${
//               isSubmitting
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             } transition duration-300`}
//           >
//             {isSubmitting ? "Publishing..." : "Publish Post"}
//           </button>

//           <button
//             type="button"
//             onClick={resetForm}
//             className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
//           >
//             Clear Form
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;
import React, { useState, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import { useAuth } from "../context/AuthContext";
import "react-quill/dist/quill.snow.css";

const BlogForm = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [section, setSection] = useState("blog");
  const [tags, setTags] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const quillRef = useRef();

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        setNotification({
          show: true,
          type: "info",
          message: "Uploading image...",
        });
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs/upload/wysiwyg-image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );

        const data = await res.json();
        if (res.ok) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          const index = range?.index ?? quill.getLength();
          quill.insertEmbed(index, "image", data.imageUrl);
          quill.setSelection(index + 1);
          setNotification({
            show: true,
            type: "success",
            message: "Image added successfully",
          });
        } else {
          setNotification({
            show: true,
            type: "error",
            message: data.msg || "Image upload failed",
          });
        }
      } catch (err) {
        console.error(err);
        setNotification({
          show: true,
          type: "error",
          message: "Server error during image upload",
        });
      } finally {
        setTimeout(
          () => setNotification({ show: false, type: "", message: "" }),
          3000
        );
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSection("blog");
    setImage(null);
    setImagePreview(null);
    setTags("");
    setContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || currentUser.role !== "admin") {
      setNotification({
        show: true,
        type: "error",
        message: "Authorization required",
      });
      setTimeout(
        () => setNotification({ show: false, type: "", message: "" }),
        3000
      );
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);
    formData.append("section", section);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setNotification({
          show: true,
          type: "success",
          message: "Blog post published successfully!",
        });
        resetForm();
      } else {
        setNotification({
          show: true,
          type: "error",
          message: data.msg || "Error publishing blog post",
        });
      }
    } catch (err) {
      console.error(err);
      setNotification({
        show: true,
        type: "error",
        message: "Server error occurred",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(
        () => setNotification({ show: false, type: "", message: "" }),
        5000
      );
    }
  };

  const NotificationBanner = () => {
    if (!notification.show) return null;

    const bgColors = {
      success: "bg-green-100 border-green-500 text-green-700",
      error: "bg-red-100 border-red-500 text-red-700",
      info: "bg-blue-100 border-blue-500 text-blue-700",
    };

    return (
      <div
        className={`mb-4 px-4 py-3 rounded border-l-4 ${
          bgColors[notification.type]
        }`}
        role="alert"
      >
        <p>{notification.message}</p>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to create a blog post.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </div>
      </div>
    );
  }

  if (currentUser.role !== "admin") {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600">
            Only administrators can create blog posts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
        Create New Content
      </h1>

      <NotificationBanner />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Type *
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="blog">Blog Post</option>
              <option value="research">Research Article</option>
              <option value="publication">Publication</option>
              <option value="event">Event Announcement</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags{" "}
            <span className="text-gray-500 text-xs">(comma separated)</span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g. technology, ai, web development"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <div className="border border-gray-300 rounded-md">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Write your amazing content here..."
              style={{ minHeight: "400px" }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail Image
          </label>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition">
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {image ? image.name : "No file chosen"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: 1200 x 630 pixels, JPG or PNG format
              </p>
            </div>

            {imagePreview && (
              <div className="w-48 h-32 relative">
                <img
                  src={imagePreview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition duration-300`}
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
