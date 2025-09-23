

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBlogById,
  likeBlog,
  unlikeBlog,
  addCommentToBlog,
  deleteBlog,
} from "../services/api";
import { useAuth } from "../context/AuthContext";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
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
        setLikeCount(data.likes?.length || 0);
        const userLiked = data.likes?.some(
          (like) => like.user === currentUserId
        );
        setUserHasLiked(!!userLiked);
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
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 1000);

      const newLikeStatus = !userHasLiked;
      
      // Make API call first before updating UI
      const response = newLikeStatus
        ? await likeBlog(id)
        : await unlikeBlog(id);

      if (response) {
        // Update UI after successful API call
        setUserHasLiked(newLikeStatus);
        setLikeCount(response.likes?.length || 0);
        setBlog((prev) => ({ ...prev, likes: response.likes || [] }));
      }
    } catch (error) {
      console.error(
        `Error ${userHasLiked ? "unliking" : "liking"} blog:`,
        error
      );
      
      // Check for specific error messages
      if (error.response?.data?.msg === "Blog already liked") {
        setLikeError("You have already liked this post!");
      } else if (error.response?.data?.msg === "Blog has not yet been liked") {
        setLikeError("You haven't liked this post yet!");
      } else {
        setLikeError(
          `Failed to ${
            userHasLiked ? "unlike" : "like"
          } the post. Please try again.`
        );
      }
      
      // Refresh to ensure UI is in sync with server
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        const success = await deleteBlog(id);
        if (success) {
          alert('Blog deleted successfully!');
          navigate('/');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
      }
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

  // Destructure blog data with default values
  const {
    title = "",
    content = "",
    image = null,
    name = "Anonymous",
    avatar = null,
    date,
    createdAt,
    tags = [],
    comments = [],
  } = blog;

  const formattedDate = (date || createdAt)
    ? new Date(date || createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  const canEditOrDelete = currentUser && (
    currentUser.role === 'admin' || 
    (blog.author && blog.author._id === currentUser._id) ||
    (blog.user && blog.user === currentUser._id)
  );

  return (
    <article className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Blog Header */}
      <header className="mb-10">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight flex-1">
            {title}
          </h1>
          
          {/* Action buttons for authorized users */}
          {canEditOrDelete && (
            <div className="flex gap-3 ml-4">
              <button
                onClick={() => navigate(`/edit-blog/${id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Author info */}
        <div className="flex items-center mb-8">
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-14 h-14 rounded-full mr-4 border-2 border-gray-200 shadow"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 shadow">
              <span className="text-white font-bold text-xl">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="text-xl font-medium text-gray-800">{name}</p>
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
              }}
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
