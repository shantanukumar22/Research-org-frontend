// import axios from "axios";

// const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// const getToken = () => localStorage.getItem("token");

// export const likeBlog = async (id) => {
//   try {
//     const res = await axios.put(
//       `${API}/api/blogs/like/${id}`,
//       {},
//       {
//         headers: { Authorization: getToken() },
//       }
//     );
//     return res.data.likes;
//   } catch (err) {
//     console.error("Like error:", err);
//   }
// };

// export const unlikeBlog = async (id) => {
//   try {
//     const res = await axios.put(
//       `${API}/api/blogs/unlike/${id}`,
//       {},
//       {
//         headers: { Authorization: getToken() },
//       }
//     );
//     return res.data.likes;
//   } catch (err) {
//     console.error("Unlike error:", err);
//   }
// };

// export const addCommentToBlog = async (id, text) => {
//   try {
//     const res = await axios.post(
//       `${API}/api/blogs/comment/${id}`,
//       { text },
//       { headers: { Authorization: getToken() } }
//     );
//     return res.data.comments;
//   } catch (err) {
//     console.error("Add comment error:", err);
//   }
// };

// // BlogAction.js

// export const deleteBlog = async (id) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) throw new Error("Failed to delete blog");
//     return true;
//   } catch (err) {
//     console.error("Error deleting blog:", err);
//     return false;
//   }
// };

// export const updateBlog = async (id, blogData) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(blogData),
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error("API response:", errorText);
//       throw new Error(`Failed to update blog: ${res.status}`);
//     }
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("Error updating blog:", err);
//     throw err; // Re-throw to handle in component
//   }
// };
