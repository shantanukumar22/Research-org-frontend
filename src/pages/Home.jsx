import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllBlogs } from "../services/api";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Lazy loaded components
const NewsletterSection = lazy(() => import("../components/home/NewsletterSection"));
const InformationCards = lazy(() => import("../components/home/InformationCards"));
const EducationalResources = lazy(() => import("../components/home/EducationalResources"));
const FeaturedGrid = lazy(() => import("../components/home/FeaturedGrid"));
const ResearchHighlights = lazy(() => import("../components/home/ResearchHighlights"));
const TeamSection = lazy(() => import("../components/home/TeamSection"));

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-96 bg-gray-200 rounded-lg"></div>
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

// Error boundary component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="text-center p-6 bg-red-50 rounded-lg">
    <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
    <pre className="text-sm text-red-600 mb-4">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Try again
    </button>
  </div>
);

const Home = () => {
  const { currentUser } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized blog filtering functions
  const filterBlogsBySection = useCallback((section) => {
    const filteredBlogs = blogs.filter((blog) => blog.section === section);
    // Show more publications, but keep other sections at 3
    return section === "publication" ? filteredBlogs.slice(0, 6) : filteredBlogs.slice(0, 3);
  }, [blogs]);

  const getRecentBlogs = useCallback(() => {
    return [...blogs]
      .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
      .slice(0, 6);
  }, [blogs]);

  // Data fetching with error handling
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await getAllBlogs();
        setBlogs(data || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch blogs");
        console.error("Blog fetching error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle blog deletion
  const handleBlogDelete = useCallback((deletedBlogId) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== deletedBlogId));
  }, []);

  // Memoized section blogs
  const researchBlogs = filterBlogsBySection("research");
  const publicationBlogs = filterBlogsBySection("publication");
  const eventBlogs = filterBlogsBySection("event");
  const recentBlogs = getRecentBlogs();
  const featuredBlog = recentBlogs[0];

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorFallback error={new Error(error)} resetErrorBoundary={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {/* Hero Section */}
        {featuredBlog && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              {featuredBlog.image && (
                <img
                  src={featuredBlog.image}
                  alt=""
                  className="w-full h-full object-cover opacity-30"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl"
              >
                <span className="inline-block px-4 py-1 bg-blue-500/30 text-blue-100 text-sm font-medium rounded-full mb-4">
                  FEATURED RESEARCH
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {featuredBlog.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100 line-clamp-3">
                  {featuredBlog.content?.replace(/<[^>]+>/g, "") || ""}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/blogs/${featuredBlog._id}`}
                    className="group relative inline-flex items-center overflow-hidden rounded-full bg-blue-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-blue-500"
                  >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                      <svg
                        className="h-5 w-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:me-4">
                      Read Full Article
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-b border-gray-200 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome to the Research Institute
                </h2>
                {currentUser ? (
                  <p className="text-gray-600 mt-1">
                    Hello, {currentUser.name}! Discover our latest research and insights.
                  </p>
                ) : (
                  <p className="text-gray-600 mt-1">
                    Advancing knowledge through innovative research and collaboration.
                  </p>
                )}
              </div>
              
              <div className="flex gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500"
                >
                  <span className="text-sm font-medium">About Us</span>
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSkeleton />}>
            {/* Research Highlights Section */}
            <ResearchHighlights />

            {/* Featured Grid Section */}
            <FeaturedGrid
              researchBlogs={researchBlogs}
              publicationBlogs={publicationBlogs}
              eventBlogs={eventBlogs}
              onBlogDelete={handleBlogDelete}
            />

            {/* Team Section */}
            <TeamSection />

            {/* Educational Resources Section */}
            <EducationalResources blogs={recentBlogs.slice(0, 4)} onBlogDelete={handleBlogDelete} />

            {/* Information Cards Section */}
            <InformationCards />

            {/* Newsletter Section */}
            <NewsletterSection />
          </Suspense>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
