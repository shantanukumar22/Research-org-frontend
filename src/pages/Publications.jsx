import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { likeBlog, unlikeBlog, deleteBlog } from "../services/api";

const Publications = () => {
  const { currentUser } = useAuth();
  const [publications, setPublications] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeLoading, setLikeLoading] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchPublications();
    fetchSubcategories();
    // Get current user ID from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.user?.id || payload.id;
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [selectedSubcategory]);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const url = selectedSubcategory === "all" 
        ? `${import.meta.env.VITE_API_URL}/api/blogs/section/publications`
        : `${import.meta.env.VITE_API_URL}/api/blogs/section/publications?subcategory=${selectedSubcategory}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPublications(data);
      } else {
        setError("Failed to fetch publications");
      }
    } catch (err) {
      console.error("Error fetching publications:", err);
      setError("Failed to fetch publications");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/subcategories/publications`);
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data);
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  const handleLikeAction = async (publicationId) => {
    if (!currentUserId) {
      alert("Please log in to like this publication");
      return;
    }

    setLikeLoading(prev => ({ ...prev, [publicationId]: true }));

    try {
      const publication = publications.find(p => p._id === publicationId);
      const userHasLiked = publication?.likes?.some(like => like.user === currentUserId);
      
      const response = userHasLiked 
        ? await unlikeBlog(publicationId)
        : await likeBlog(publicationId);

      if (response) {
        // Update the publication in the state
        setPublications(prev => 
          prev.map(p => 
            p._id === publicationId 
              ? { ...p, likes: response.likes }
              : p
          )
        );
      }
    } catch (error) {
      const publication = publications.find(p => p._id === publicationId);
      const userHasLiked = publication?.likes?.some(like => like.user === currentUserId);
      
      // Check if it's an "already liked" error
      if (error.response?.data?.msg === "Blog already liked") {
        alert("You have already liked this publication!");
      } else if (error.response?.data?.msg === "Blog has not yet been liked") {
        alert("You haven't liked this publication yet!");
      } else {
        console.error(`Error ${userHasLiked ? "unliking" : "liking"} publication:`, error);
        alert(`Failed to ${userHasLiked ? "unlike" : "like"} the publication. Please try again.`);
      }
    } finally {
      setLikeLoading(prev => ({ ...prev, [publicationId]: false }));
    }
  };

  const handleDelete = async (publicationId) => {
    if (window.confirm('Are you sure you want to delete this publication? This action cannot be undone.')) {
      try {
        const success = await deleteBlog(publicationId);
        if (success) {
          setPublications(prev => prev.filter(p => p._id !== publicationId));
        }
      } catch (error) {
        console.error('Error deleting publication:', error);
        alert('Failed to delete publication. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchPublications();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-4">
                Our publications
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Resources and insights
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                The latest industry news, interviews, technologies, and resources.
              </p>
            </div>
            
            {/* Search Bar and Admin Button */}
            <div className="hidden lg:flex items-center ml-8 space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              {/* Admin Create Button */}
              {currentUser?.role === "admin" && (
                <Link
                  to="/create-blog"
                  className="inline-flex items-center px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Publication
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Mobile Admin Button */}
        {currentUser?.role === "admin" && (
          <div className="lg:hidden mb-6">
            <Link
              to="/create-blog"
              className="inline-flex items-center px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Publication
            </Link>
          </div>
        )}

        {/* Filter Section - Clean Design */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSubcategory("all")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedSubcategory === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All Publications
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => setSelectedSubcategory(subcategory)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedSubcategory === subcategory
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>

        {/* Publications Grid */}
        {publications.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No publications found</h3>
            <p className="text-gray-500">
              {selectedSubcategory === "all" 
                ? "No publications have been added yet."
                : `No publications found in the "${selectedSubcategory}" category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((publication) => {
              const canEditOrDelete = currentUser && (
                currentUser.role === 'admin' || 
                (publication.author && publication.author._id === currentUser._id) ||
                (publication.user && publication.user === currentUser._id)
              );

              return (
                <div
                  key={publication._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 relative"
                >
                  {/* Action buttons for authorized users */}
                  {canEditOrDelete && (
                    <div className="absolute top-3 right-3 z-10 flex gap-2">
                      <Link
                        to={`/edit-blog/${publication._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors shadow-lg"
                        title="Edit publication"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(publication._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg"
                        title="Delete publication"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                {publication.image && (
                  <img
                    src={publication.image}
                    alt={publication.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="mb-3">
                    {publication.subcategory && (
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {publication.subcategory}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group">
                    <Link
                      to={`/blogs/${publication._id}`}
                      className="flex items-center justify-between"
                    >
                      {publication.title}
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {publication.content.replace(/<[^>]+>/g, "").slice(0, 120)}
                    {publication.content.length > 120 && "..."}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-600">
                          {publication.name ? publication.name.charAt(0).toUpperCase() : 'A'}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {publication.name || 'Anonymous'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(publication.date).toLocaleDateString('en-US', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Like Button */}
                    <button
                      onClick={() => handleLikeAction(publication._id)}
                      disabled={likeLoading[publication._id]}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        publication.likes?.some(like => like.user === currentUserId)
                          ? "bg-pink-100 text-pink-700 border border-pink-300 hover:bg-pink-200"
                          : "bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-gray-300"
                      } ${likeLoading[publication._id] ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {likeLoading[publication._id] ? (
                        <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span className="text-lg">
                          {publication.likes?.some(like => like.user === currentUserId) ? "❤️" : "🤍"}
                        </span>
                      )}
                      <span className="text-xs">
                        {publication.likes?.length || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
