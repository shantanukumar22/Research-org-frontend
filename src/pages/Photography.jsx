import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Photography = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [photography, setPhotography] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPhotography();
  }, []);

  const fetchPhotography = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/photography/all`);
      if (response.ok) {
        const data = await response.json();
        setPhotography(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching photography:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotography = selectedCategory === "all" 
    ? photography 
    : photography.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-0.5 bg-gray-400 mr-6"></div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-wider">GALLERY</h1>
            <div className="w-16 h-0.5 bg-gray-400 ml-6"></div>
          </div>
        </div>

        {/* Admin Create Button */}
        {isAuthenticated && currentUser.role === "admin" && (
          <div className="flex justify-center mb-12">
            <Link
              to="/create-photography"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Collection
            </Link>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
            }`}
          >
            All Collections
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Photography Grid */}
        {filteredPhotography.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">No collections found</h3>
            <p className="text-gray-500 text-lg">
              {selectedCategory === "all" 
                ? "No photography collections have been added yet."
                : `No collections found in the "${selectedCategory}" category.`
              }
            </p>
          </div>
        ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPhotography.map((collection) => (
                  <div
                    key={collection._id}
                    className="relative overflow-hidden rounded-xl cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300"
                    onClick={() => navigate(`/photography/${collection._id}`)}
                  >
                    {/* Display first media item (image or video) */}
                    {collection.mediaType === "videos" && collection.videos && collection.videos.length > 0 ? (
                      <video
                        src={collection.videos[0]}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        muted
                        loop
                        playsInline
                      />
                    ) : collection.images && collection.images.length > 0 ? (
                      <img
                        src={collection.images[0]}
                        alt={collection.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Media type indicator */}
                    <div className="absolute top-4 right-4">
                      {collection.mediaType === "videos" && (
                        <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          Video
                        </div>
                      )}
                      {collection.mediaType === "mixed" && (
                        <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          Mixed
                        </div>
                      )}
                    </div>

                    {/* Dark overlay with title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-white font-bold text-xl mb-2">
                          {collection.title}
                        </h3>
                        <p className="text-white/90 text-sm mb-2">
                          {collection.mediaType === "videos" && collection.videos ? 
                            `${collection.videos.length} videos` :
                            collection.mediaType === "mixed" && collection.images && collection.videos ?
                            `${collection.images.length} images, ${collection.videos.length} videos` :
                            collection.images ? `${collection.images.length} images` : 'No media'
                          }
                        </p>
                        <p className="text-white/80 text-xs">
                          {collection.category}
                        </p>
                      </div>
                    </div>
                    {/* Always visible title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white font-bold text-xl">
                        {collection.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
        )}
      </div>
    </div>
  );
};

export default Photography; 