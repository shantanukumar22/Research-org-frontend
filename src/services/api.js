import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// BLOG APIs
export const getBlogById = async (id) => {
  try {
    const res = await api.get(`/api/blogs/${id}`);
    return res.data;
  } catch (err) {
    console.error("getBlogById error:", err);
    return null;
  }
};


export const getAllBlogs = async () => {
  try {
    const res = await api.get("/api/blogs/all");
    return res.data;
  } catch (err) {
    console.error("getAllBlogs error:", err);
    return [];
  }
};

export const likeBlog = async (id) => {
  try {
    const res = await api.put(`/api/blogs/like/${id}`);
    return res.data.likes;
  } catch (err) {
    console.error("likeBlog error:", err);
  }
};

export const unlikeBlog = async (id) => {
  try {
    const res = await api.put(`/api/blogs/unlike/${id}`);
    return res.data.likes;
  } catch (err) {
    console.error("unlikeBlog error:", err);
  }
};

export const addCommentToBlog = async (id, text) => {
  try {
    const res = await api.post(`/api/blogs/comment/${id}`, { text });
    return res.data.comments;
  } catch (err) {
    console.error("addCommentToBlog error:", err);
  }
};

export const deleteBlog = async (id) => {
  try {
    await api.delete(`/api/blogs/${id}`);
    return true;
  } catch (err) {
    console.error("deleteBlog error:", err);
    return false;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const res = await api.put(`/api/blogs/${id}`, blogData);
    return res.data;
  } catch (err) {
    console.error("updateBlog error:", err);
    throw err;
  }
};

// OTHER APIs

export const getRecentPosts = async () => {
  try {
    const res = await api.get("/api/blogs?sort=latest&limit=5");
    return res.data;
  } catch (err) {
    console.error("getRecentPosts error:", err);
    return [];
  }
};

export const getTopPosts = async () => {
  try {
    const res = await api.get("/api/blogs/top?limit=3");
    return res.data;
  } catch (err) {
    console.error("getTopPosts error:", err);
    return [];
  }
};

export const getUpcomingEvents = async () => {
  try {
    const res = await api.get("/api/events/upcoming");
    return res.data;
  } catch (err) {
    console.error("getUpcomingEvents error:", err);
    return [];
  }
};

export default api;
