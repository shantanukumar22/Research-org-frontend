import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PhotographyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [currentMediaType, setCurrentMediaType] = useState("images");

  useEffect(() => {
    fetchCollection();
  }, [id]);

  useEffect(() => {
    if (collection) {
      // Set initial media type based on what's available
      if (collection.mediaType === "videos" && collection.videos && collection.videos.length > 0) {
        setCurrentMediaType("videos");
      } else if (collection.images && collection.images.length > 0) {
        setCurrentMediaType("images");
      }
    }
  }, [collection]);

  const fetchCollection = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/photography/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCollection(data);
      } else {
        setError("Collection not found");
      }
    } catch (error) {
      console.error("Error fetching collection:", error);
      setError("Failed to load collection");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this collection?")) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/photography/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        navigate("/photography");
      } else {
        alert("Failed to delete collection");
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
      alert("Failed to delete collection");
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === collection.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? collection.images.length - 1 : prev - 1
    );
  };

  const nextVideo = () => {
    setSelectedVideoIndex((prev) => 
      prev === collection.videos.length - 1 ? 0 : prev + 1
    );
  };

  const prevVideo = () => {
    setSelectedVideoIndex((prev) => 
      prev === 0 ? collection.videos.length - 1 : prev - 1
    );
  };

  const nextMedia = () => {
    if (currentMediaType === "images") {
      nextImage();
    } else {
      nextVideo();
    }
  };

  const prevMedia = () => {
    if (currentMediaType === "images") {
      prevImage();
    } else {
      prevVideo();
    }
  };

  const getTotalMediaCount = () => {
    const imageCount = collection.images ? collection.images.length : 0;
    const videoCount = collection.videos ? collection.videos.length : 0;
    return imageCount + videoCount;
  };

  const getCurrentMediaIndex = () => {
    if (currentMediaType === "images") {
      return selectedImageIndex + 1;
    } else {
      const imageCount = collection.images ? collection.images.length : 0;
      return imageCount + selectedVideoIndex + 1;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Collection Not Found"}
          </h2>
          <p className="text-gray-600 mb-8">
            The photography collection you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/photography")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Main Content Card */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/photography")}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-6"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Gallery
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{collection.title}</h1>
            </div>
            
            {/* Admin Actions */}
            {isAuthenticated && currentUser.role === "admin" && (
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate(`/edit-photography/${id}`)}
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Collection Info */}
          <div className="flex items-center space-x-4 mb-8 text-sm text-gray-600">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {collection.category}
            </span>
            <span>{new Date(collection.date).toLocaleDateString()}</span>
            {collection.createdBy && (
              <span>by {collection.createdBy.name}</span>
            )}
          </div>

          {/* Description */}
          {collection.description && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-0.5 bg-gray-400 mr-4"></div>
                <h2 className="text-xl font-bold text-gray-900">DESCRIPTION</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{collection.description}</p>
            </div>
          )}

          {/* Main Media Display */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-0.5 bg-gray-400 mr-4"></div>
              <h2 className="text-xl font-bold text-gray-900">GALLERY</h2>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              {/* Display current media (image or video) */}
              {currentMediaType === "videos" && collection.videos && collection.videos.length > 0 ? (
                <video
                  src={collection.videos[selectedVideoIndex]}
                  className="w-full h-96 md:h-[600px] object-cover"
                  controls
                  autoPlay
                  loop
                  muted
                />
              ) : collection.images && collection.images.length > 0 ? (
                <img
                  src={collection.images[selectedImageIndex]}
                  alt={`${collection.title} ${selectedImageIndex + 1}`}
                  className="w-full h-96 md:h-[600px] object-cover"
                />
              ) : (
                <div className="w-full h-96 md:h-[600px] bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">No media available</p>
                  </div>
                </div>
              )}
              
              {/* Navigation Arrows */}
              {getTotalMediaCount() > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Media Counter */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {getCurrentMediaIndex()} / {getTotalMediaCount()}
              </div>

              {/* Media Type Indicator */}
              <div className="absolute top-4 left-4">
                {currentMediaType === "videos" && (
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Video
                  </div>
                )}
                {currentMediaType === "images" && (
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    Image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Grid */}
          {getTotalMediaCount() > 1 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Media</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* Image thumbnails */}
                {collection.images && collection.images.map((image, index) => (
                  <button
                    key={`img-${index}`}
                    onClick={() => {
                      setCurrentMediaType("images");
                      setSelectedImageIndex(index);
                    }}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      currentMediaType === "images" && selectedImageIndex === index
                        ? "border-gray-900 ring-2 ring-gray-200"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${collection.title} image ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-blue-600 text-white px-1 py-0.5 rounded text-xs">
                      IMG
                    </div>
                  </button>
                ))}
                
                {/* Video thumbnails */}
                {collection.videos && collection.videos.map((video, index) => (
                  <button
                    key={`vid-${index}`}
                    onClick={() => {
                      setCurrentMediaType("videos");
                      setSelectedVideoIndex(index);
                    }}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      currentMediaType === "videos" && selectedVideoIndex === index
                        ? "border-gray-900 ring-2 ring-gray-200"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <video
                      src={video}
                      className="w-full h-24 object-cover"
                      muted
                    />
                    <div className="absolute top-1 left-1 bg-red-600 text-white px-1 py-0.5 rounded text-xs">
                      VID
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {collection.tags && collection.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {collection.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotographyDetail; 