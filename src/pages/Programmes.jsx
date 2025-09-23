import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Programmes = () => {
  const { currentUser } = useAuth();
  const [programmes, setProgrammes] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgrammes();
    fetchSubcategories();
  }, [selectedSubcategory]);

  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const url = selectedSubcategory === "all" 
        ? `${import.meta.env.VITE_API_URL}/api/blogs/section/programmes`
        : `${import.meta.env.VITE_API_URL}/api/blogs/section/programmes?subcategory=${selectedSubcategory}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProgrammes(data);
      } else {
        setError("Failed to fetch programmes");
      }
    } catch (err) {
      console.error("Error fetching programmes:", err);
      setError("Failed to fetch programmes");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/subcategories/programmes`);
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data);
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
              fetchProgrammes();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
                Our programmes
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
                  Create Programme
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
              Create Programme
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
              All Programmes
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

        {/* Programmes Grid */}
        {programmes.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No programmes found</h3>
            <p className="text-gray-500">
              {selectedSubcategory === "all" 
                ? "No programmes have been added yet."
                : `No programmes found in the "${selectedSubcategory}" category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmes.map((programme) => (
              <div
                key={programme._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {programme.image && (
                  <img
                    src={programme.image}
                    alt={programme.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="mb-3">
                    {programme.subcategory && (
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {programme.subcategory}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group">
                    <Link
                      to={`/blogs/${programme._id}`}
                      className="flex items-center justify-between"
                    >
                      {programme.title}
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {programme.content.replace(/<[^>]+>/g, "").slice(0, 120)}
                    {programme.content.length > 120 && "..."}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-gray-600">
                        {programme.name ? programme.name.charAt(0).toUpperCase() : 'A'}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {programme.name || 'Anonymous'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(programme.date).toLocaleDateString('en-US', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programmes;
