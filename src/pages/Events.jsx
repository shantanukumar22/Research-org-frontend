import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Events = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedEventStatus, setSelectedEventStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchSubcategories();
  }, [selectedSubcategory, selectedEventStatus]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let url = `${import.meta.env.VITE_API_URL}/api/blogs/section/events`;
      const params = new URLSearchParams();
      
      if (selectedSubcategory !== "all") {
        params.append("subcategory", selectedSubcategory);
      }
      
      if (selectedEventStatus !== "all") {
        params.append("eventStatus", selectedEventStatus);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        setError("Failed to fetch events");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/subcategories/events`);
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data);
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isEventUpcoming = (eventDate) => {
    return new Date(eventDate) > new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
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
              fetchEvents();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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
                Our events
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
                  Create Event
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter Section - Clean Design */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedEventStatus("all")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedEventStatus === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedEventStatus("upcoming")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedEventStatus === "upcoming"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedEventStatus("past")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedEventStatus === "past"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Past Events
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

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">
              {selectedEventStatus === "all" && selectedSubcategory === "all"
                ? "No events have been added yet."
                : `No events found with the selected filters.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 ${
                  event.eventStatus === "past" ? "opacity-75" : ""
                }`}
              >
                {event.image && (
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    {event.eventStatus === "upcoming" && (
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Upcoming
                      </div>
                    )}
                    {event.eventStatus === "past" && (
                      <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Past Event
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  <div className="mb-3">
                    {event.subcategory && (
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {event.subcategory}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group">
                    <Link
                      to={`/blogs/${event._id}`}
                      className="flex items-center justify-between"
                    >
                      {event.title}
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </h3>
                  
                  {event.eventDate && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Event Date:</span> {formatEventDate(event.eventDate)}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.content.replace(/<[^>]+>/g, "").slice(0, 120)}
                    {event.content.length > 120 && "..."}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-gray-600">
                        {event.name ? event.name.charAt(0).toUpperCase() : 'A'}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {event.name || 'Anonymous'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString('en-US', { 
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

export default Events;
