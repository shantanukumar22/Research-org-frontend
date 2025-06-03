// // import { useEffect, useState } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import { getAllBlogs } from "../services/api";
// // import { Link } from "react-router-dom";

// // const Home = () => {
// //   const { currentUser } = useAuth();
// //   const [blogs, setBlogs] = useState([]);

// //   useEffect(() => {
// //     const fetchBlogs = async () => {
// //       const data = await getAllBlogs();
// //       setBlogs(data || []);
// //     };
// //     fetchBlogs();
// //   }, []);

// //   // Recent blogs for main display
// //   const recentBlogs = [...blogs]
// //     .sort((a, b) => new Date(b.date) - new Date(a.date))
// //     .slice(0, 6);

// //   // Featured blog (most recent)
// //   const featuredBlog = recentBlogs.length > 0 ? recentBlogs[0] : null;

// //   // Upcoming events
// //   const events = [
// //     {
// //       id: 1,
// //       title: "Annual Research Symposium",
// //       description:
// //         "Join our annual symposium discussing latest research findings.",
// //       date: "2025-05-15",
// //       location: "Main Conference Hall",
// //     },
// //     {
// //       id: 2,
// //       title: "Research Methodology Workshop",
// //       description: "Learn about modern research methodologies and approaches.",
// //       date: "2025-05-25",
// //       location: "Room 302",
// //     },
// //     {
// //       id: 3,
// //       title: "Public Policy Forum",
// //       description: "Discussion on recent policy developments and implications.",
// //       date: "2025-06-10",
// //       location: "Auditorium B",
// //     },
// //   ];

// //   return (
// //     <div className="bg-gray-50">
// //       {/* Header Banner - Featured Blog */}
// //       {featuredBlog && (
// //         <section className="relative bg-gray-900 text-white">
// //           {featuredBlog.image && (
// //             <div className="absolute inset-0 z-0">
// //               <img
// //                 src={featuredBlog.image}
// //                 alt={featuredBlog.title}
// //                 className="w-full h-full object-cover opacity-40"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
// //             </div>
// //           )}
// //           <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 relative z-10">
// //             <div className="max-w-3xl">
// //               <div className="text-blue-300 text-sm font-semibold mb-3">
// //                 FEATURED RESEARCH
// //               </div>
// //               <h1 className="text-3xl md:text-5xl font-bold mb-4">
// //                 {featuredBlog.title}
// //               </h1>
// //               <p className="text-lg md:text-xl mb-6 text-gray-200 line-clamp-3">
// //                 {featuredBlog.content.replace(/<[^>]+>/g, "")}
// //               </p>
// //               <Link
// //                 to={`/blogs/${featuredBlog._id}`}
// //                 className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md inline-block font-medium"
// //               >
// //                 Read Full Article
// //               </Link>
// //               <div className="mt-4 text-blue-200">
// //                 Published on {new Date(featuredBlog.date).toLocaleDateString()}
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       )}

// //       {/* Welcome Message */}
// //       <section className="bg-white border-b border-gray-200">
// //         <div className="max-w-6xl mx-auto px-4 py-8">
// //           <div className="flex flex-col md:flex-row justify-between items-center">
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-800">
// //                 Welcome to the Research Institute
// //               </h2>
// //               {currentUser ? (
// //                 <p className="text-gray-600">
// //                   Hello, {currentUser.name}! Thank you for visiting our research
// //                   portal.
// //                 </p>
// //               ) : (
// //                 <p className="text-gray-600">
// //                   Advancing knowledge through rigorous research and public
// //                   engagement.
// //                 </p>
// //               )}
// //             </div>
// //             <div className="mt-4 md:mt-0">
// //               <Link
// //                 to="/about"
// //                 className="text-blue-700 hover:text-blue-800 font-medium"
// //               >
// //                 About Us <span aria-hidden="true">→</span>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Main Content */}
// //       <div className="max-w-6xl mx-auto px-4 py-12">
// //         {/* About Us Summary */}
// //         <section className="mb-16">
// //           <div className="bg-white rounded-lg shadow-sm p-8">
// //             <h2 className="text-3xl font-bold text-gray-800 mb-4">
// //               About Our Institute
// //             </h2>
// //             <div className="flex flex-col md:flex-row gap-8">
// //               <div className="md:w-3/5">
// //                 <p className="text-gray-600 mb-4">
// //                   Our research institute is dedicated to advancing understanding
// //                   and producing valuable insights across a range of important
// //                   topics. Founded in 2010, we bring together experts from
// //                   various disciplines to address pressing societal challenges
// //                   through rigorous research methodologies.
// //                 </p>
// //                 <p className="text-gray-600 mb-4">
// //                   We collaborate with government agencies, academic
// //                   institutions, and community organizations to ensure our
// //                   research has practical applications and meaningful impact.
// //                 </p>
// //                 <div className="flex gap-4 mt-6">
// //                   <Link
// //                     to="/about"
// //                     className="bg-blue-700 text-white hover:bg-blue-800 transition px-5 py-2 rounded-md font-medium"
// //                   >
// //                     Learn More
// //                   </Link>
// //                   <Link
// //                     to="/contact"
// //                     className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition px-5 py-2 rounded-md font-medium"
// //                   >
// //                     Contact Us
// //                   </Link>
// //                 </div>
// //               </div>
// //               <div className="md:w-2/5">
// //                 <div className="bg-gray-100 h-full rounded-lg p-6">
// //                   <h3 className="text-xl font-bold mb-4">Our Focus Areas</h3>
// //                   <ul className="text-gray-700 space-y-3">
// //                     <li className="flex items-start">
// //                       <div className="text-blue-700 mr-2">•</div>
// //                       <div>Environmental Sustainability Research</div>
// //                     </li>
// //                     <li className="flex items-start">
// //                       <div className="text-blue-700 mr-2">•</div>
// //                       <div>Public Policy Analysis</div>
// //                     </li>
// //                     <li className="flex items-start">
// //                       <div className="text-blue-700 mr-2">•</div>
// //                       <div>Social Impact Assessment</div>
// //                     </li>
// //                     <li className="flex items-start">
// //                       <div className="text-blue-700 mr-2">•</div>
// //                       <div>Technology & Society Studies</div>
// //                     </li>
// //                     <li className="flex items-start">
// //                       <div className="text-blue-700 mr-2">•</div>
// //                       <div>Educational Research & Development</div>
// //                     </li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Recent Blogs */}
// //         <section className="mb-16">
// //           <div className="flex items-center justify-between mb-8">
// //             <h2 className="text-3xl font-bold text-gray-800">
// //               Recent Articles
// //             </h2>
// //             <Link
// //               to="/blogs"
// //               className="text-blue-700 hover:underline font-medium"
// //             >
// //               View All Articles
// //             </Link>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {recentBlogs.slice(1).map((blog) => (
// //               <Link
// //                 to={`/blogs/${blog._id}`}
// //                 key={blog._id}
// //                 className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
// //               >
// //                 {blog.image && (
// //                   <img
// //                     src={blog.image}
// //                     alt={blog.title}
// //                     className="h-48 w-full object-cover"
// //                   />
// //                 )}
// //                 <div className="p-6">
// //                   <h3 className="font-bold text-xl mb-3">{blog.title}</h3>
// //                   <p className="text-gray-600 line-clamp-3 mb-4">
// //                     {blog.content.replace(/<[^>]+>/g, "")}
// //                   </p>
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-sm text-gray-500">
// //                       {new Date(blog.date).toLocaleDateString()}
// //                     </span>
// //                     <span className="text-blue-700 hover:underline font-medium">
// //                       Read More
// //                     </span>
// //                   </div>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Upcoming Events */}
// //         <section className="mb-16">
// //           <div className="flex items-center justify-between mb-8">
// //             <h2 className="text-3xl font-bold text-gray-800">
// //               Upcoming Events
// //             </h2>
// //             <Link
// //               to="/events"
// //               className="text-blue-700 hover:underline font-medium"
// //             >
// //               View All Events
// //             </Link>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             {events.map((event) => (
// //               <div
// //                 key={event.id}
// //                 className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
// //               >
// //                 <div className="text-blue-700 font-semibold mb-2">
// //                   {new Date(event.date).toLocaleDateString("en-US", {
// //                     weekday: "long",
// //                     month: "long",
// //                     day: "numeric",
// //                     year: "numeric",
// //                   })}
// //                 </div>
// //                 <h3 className="text-xl font-bold mb-3">{event.title}</h3>
// //                 <p className="text-gray-600 mb-4">{event.description}</p>
// //                 <div className="flex items-center text-gray-500 mb-4">
// //                   <svg
// //                     className="w-5 h-5 mr-2"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                     xmlns="http://www.w3.org/2000/svg"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth="2"
// //                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
// //                     ></path>
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth="2"
// //                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
// //                     ></path>
// //                   </svg>
// //                   <span>{event.location}</span>
// //                 </div>
// //                 <Link
// //                   to={`/events/${event.id}`}
// //                   className="text-blue-700 hover:underline font-medium"
// //                 >
// //                   Event Details
// //                 </Link>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Statistics */}
// //         <section className="mb-16">
// //           <div className="bg-blue-700 text-white rounded-lg overflow-hidden">
// //             <div className="px-6 py-10 md:p-10">
// //               <h2 className="text-3xl font-bold mb-8 text-center">
// //                 Our Impact
// //               </h2>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
// //                 <div>
// //                   <div className="text-4xl font-bold mb-2">250+</div>
// //                   <div className="text-blue-200">Research Papers</div>
// //                 </div>
// //                 <div>
// //                   <div className="text-4xl font-bold mb-2">45</div>
// //                   <div className="text-blue-200">Researchers</div>
// //                 </div>
// //                 <div>
// //                   <div className="text-4xl font-bold mb-2">12</div>
// //                   <div className="text-blue-200">Active Projects</div>
// //                 </div>
// //                 <div>
// //                   <div className="text-4xl font-bold mb-2">30+</div>
// //                   <div className="text-blue-200">Partner Organizations</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Newsletter */}
// //         <section>
// //           <div className="bg-gray-100 rounded-lg p-8">
// //             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
// //               <div className="md:w-2/3">
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //                   Stay Updated
// //                 </h2>
// //                 <p className="text-gray-600">
// //                   Subscribe to our newsletter to receive the latest research
// //                   updates, articles, and event announcements.
// //                 </p>
// //               </div>
// //               <div className="md:w-1/3 w-full">
// //                 <form className="flex w-full">
// //                   <input
// //                     type="email"
// //                     placeholder="Your email address"
// //                     className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     required
// //                   />
// //                   <button
// //                     type="submit"
// //                     className="bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-r-md font-medium transition"
// //                   >
// //                     Subscribe
// //                   </button>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       </div>

// //     </div>
// //   );
// // };

// // export default Home;

// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getAllBlogs } from "../services/api";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const { currentUser } = useAuth();
//   const [blogs, setBlogs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getAllBlogs();
//         setBlogs(data || []);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch blogs");
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   // Get blogs organized by section
//   const environmentalBlogs = blogs
//     .filter((blog) => blog.section === "research")
//     .slice(0, 3);
//   const policyBlogs = blogs
//     .filter((blog) => blog.section === "publication")
//     .slice(0, 3);
//   const technologyBlogs = blogs
//     .filter((blog) => blog.section === "event")
//     .slice(0, 3);
//   const educationalBlogs = blogs
//     .filter((blog) => blog.section === "research")
//     .slice(0, 3);

//   // Recent blogs for main display (most recent 6)
//   const recentBlogs = [...blogs]
//     .sort(
//       (a, b) =>
//         new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
//     )
//     .slice(0, 6);

//   // Featured blog (most recent)
//   const featuredBlog = recentBlogs.length > 0 ? recentBlogs[0] : null;

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 p-6">
//         <p>{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50">
//       {/* Hero Section with Featured Blog */}
//       {featuredBlog && (
//         <section className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white">
//           <div className="absolute inset-0 z-0 overflow-hidden">
//             {featuredBlog.image && (
//               <img
//                 src={featuredBlog.image}
//                 alt={featuredBlog.title}
//                 className="w-full h-full object-cover "
//               />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
//           </div>
//           <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
//             <div className="max-w-3xl">
//               <div className="inline-block px-3 py-1 bg-blue-500 bg-opacity-30 text-blue-100 text-sm font-medium rounded-full mb-4">
//                 FEATURED RESEARCH
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
//                 {featuredBlog.title}
//               </h1>
//               <p className="text-lg md:text-xl mb-8 text-gray-100 line-clamp-3">
//                 {featuredBlog.content?.replace(/<[^>]+>/g, "") || ""}
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <Link
//                   to={`/blogs/${featuredBlog._id}`}
//                   className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md inline-block font-medium shadow-lg"
//                 >
//                   Read Full Article
//                 </Link>
//                 <Link
//                   to={`/section/${featuredBlog.section || "recent"}`}
//                   className="bg-transparent border border-white hover:bg-white hover:text-blue-800 text-white transition px-6 py-3 rounded-md inline-block font-medium"
//                 >
//                   Explore Section
//                 </Link>
//               </div>
//               <div className="mt-6 text-blue-200 flex items-center">
//                 <svg
//                   className="w-5 h-5 mr-2"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//                 Published on{" "}
//                 {new Date(
//                   featuredBlog.createdAt || featuredBlog.date
//                 ).toLocaleDateString()}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Welcome Banner */}
//       <section className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Welcome to the Research Institute
//               </h2>
//               {currentUser ? (
//                 <p className="text-gray-600 mt-1">
//                   Hello, {currentUser.name}! Discover our latest research and
//                   upcoming events.
//                 </p>
//               ) : (
//                 <p className="text-gray-600 mt-1">
//                   Advancing knowledge through rigorous research and public
//                   engagement.
//                 </p>
//               )}
//             </div>
//             <div className="mt-4 md:mt-0 flex gap-3">
//               <Link
//                 to="/about"
//                 className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
//               >
//                 About Us
//                 <svg
//                   className="w-4 h-4 ml-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 5l7 7-7 7"
//                   ></path>
//                 </svg>
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-blue-700 hover:text-blue-800 font-medium flex items-center ml-6"
//               >
//                 Contact
//                 <svg
//                   className="w-4 h-4 ml-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 5l7 7-7 7"
//                   ></path>
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         {/* Latest Research Publications */}
//         <section className="mb-16">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">
//               Latest Research
//             </h2>
//             <Link
//               to="/blogs"
//               className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
//             >
//               View All Research
//               <svg
//                 className="w-4 h-4 ml-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5l7 7-7 7"
//                 ></path>
//               </svg>
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {recentBlogs.slice(0, 3).map((blog) => (
//               <Link
//                 to={`/blogs/${blog._id}`}
//                 key={blog._id}
//                 className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col h-full group"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   {blog.image ? (
//                     <img
//                       src={blog.image}
//                       alt={blog.title}
//                       className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-16 w-16 text-gray-400"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1}
//                           d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                     </div>
//                   )}
//                   {blog.section && (
//                     <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded uppercase">
//                       {blog.section}
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-6 flex-grow">
//                   <h3 className="font-bold text-xl mb-3 group-hover:text-blue-700 transition">
//                     {blog.title}
//                   </h3>
//                   <p className="text-gray-600 line-clamp-3 mb-4">
//                     {blog.content?.replace(/<[^>]+>/g, "") || ""}
//                   </p>
//                 </div>
//                 <div className="px-6 pb-6 pt-0 flex justify-between items-center mt-auto">
//                   <span className="text-sm text-gray-500 flex items-center">
//                     <svg
//                       className="w-4 h-4 mr-1"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                         clipRule="evenodd"
//                       ></path>
//                     </svg>
//                     {new Date(blog.createdAt || blog.date).toLocaleDateString()}
//                   </span>
//                   <span className="text-blue-700 font-medium flex items-center">
//                     Read More
//                     <svg
//                       className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 5l7 7-7 7"
//                       ></path>
//                     </svg>
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Featured Section Grid */}
//         <section className="mb-16">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Environmental Research */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                   <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
//                   Environmental Research
//                 </h3>
//                 <Link
//                   to="/section/environmental"
//                   className="text-green-700 hover:text-green-800 text-sm font-medium"
//                 >
//                   View All
//                 </Link>
//               </div>
//               <div className="space-y-5">
//                 {environmentalBlogs.length > 0 ? (
//                   environmentalBlogs.map((blog) => (
//                     <Link
//                       to={`/blogs/${blog._id}`}
//                       key={blog._id}
//                       className="block group"
//                     >
//                       <div className="flex items-start">
//                         {blog.image ? (
//                           <img
//                             src={blog.image}
//                             alt={blog.title}
//                             className="w-16 h-16 object-cover rounded mr-4"
//                           />
//                         ) : (
//                           <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
//                             <svg
//                               className="w-8 h-8 text-gray-400"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="1.5"
//                                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               ></path>
//                             </svg>
//                           </div>
//                         )}
//                         <div>
//                           <h4 className="font-medium text-gray-900 group-hover:text-green-700 transition line-clamp-2">
//                             {blog.title}
//                           </h4>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {new Date(
//                               blog.createdAt || blog.date
//                             ).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm py-4">
//                     No environmental research articles available.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Policy Research */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                   <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
//                   Policy Research
//                 </h3>
//                 <Link
//                   to="/section/policy"
//                   className="text-blue-700 hover:text-blue-800 text-sm font-medium"
//                 >
//                   View All
//                 </Link>
//               </div>
//               <div className="space-y-5">
//                 {policyBlogs.length > 0 ? (
//                   policyBlogs.map((blog) => (
//                     <Link
//                       to={`/blogs/${blog._id}`}
//                       key={blog._id}
//                       className="block group"
//                     >
//                       <div className="flex items-start">
//                         {blog.image ? (
//                           <img
//                             src={blog.image}
//                             alt={blog.title}
//                             className="w-16 h-16 object-cover rounded mr-4"
//                           />
//                         ) : (
//                           <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
//                             <svg
//                               className="w-8 h-8 text-gray-400"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="1.5"
//                                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               ></path>
//                             </svg>
//                           </div>
//                         )}
//                         <div>
//                           <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition line-clamp-2">
//                             {blog.title}
//                           </h4>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {new Date(
//                               blog.createdAt || blog.date
//                             ).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm py-4">
//                     No policy research articles available.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Technology Research */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                   <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
//                   Technology Research
//                 </h3>
//                 <Link
//                   to="/section/technology"
//                   className="text-purple-700 hover:text-purple-800 text-sm font-medium"
//                 >
//                   View All
//                 </Link>
//               </div>
//               <div className="space-y-5">
//                 {technologyBlogs.length > 0 ? (
//                   technologyBlogs.map((blog) => (
//                     <Link
//                       to={`/blogs/${blog._id}`}
//                       key={blog._id}
//                       className="block group"
//                     >
//                       <div className="flex items-start">
//                         {blog.image ? (
//                           <img
//                             src={blog.image}
//                             alt={blog.title}
//                             className="w-16 h-16 object-cover rounded mr-4"
//                           />
//                         ) : (
//                           <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
//                             <svg
//                               className="w-8 h-8 text-gray-400"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="1.5"
//                                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               ></path>
//                             </svg>
//                           </div>
//                         )}
//                         <div>
//                           <h4 className="font-medium text-gray-900 group-hover:text-purple-700 transition line-clamp-2">
//                             {blog.title}
//                           </h4>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {new Date(
//                               blog.createdAt || blog.date
//                             ).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm py-4">
//                     No technology research articles available.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Featured Educational Research */}
//         <section className="mb-16">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">
//               Educational Research
//             </h2>
//             <Link
//               to="/section/research"
//               className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
//             >
//               View All Educational Research
//               <svg
//                 className="w-4 h-4 ml-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5l7 7-7 7"
//                 ></path>
//               </svg>
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {educationalBlogs.length > 0 ? (
//               educationalBlogs.map((blog) => (
//                 <Link
//                   to={`/blogs/${blog._id}`}
//                   key={blog._id}
//                   className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group"
//                 >
//                   <div className="h-48 overflow-hidden">
//                     {blog.image ? (
//                       <img
//                         src={blog.image}
//                         alt={blog.title}
//                         className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-amber-50 flex items-center justify-center">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-16 w-16 text-amber-300"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="1.5"
//                             d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                           />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-6">
//                     <h3 className="font-bold text-xl mb-3 group-hover:text-amber-700 transition">
//                       {blog.title}
//                     </h3>
//                     <p className="text-gray-600 line-clamp-3 mb-4">
//                       {blog.content?.replace(/<[^>]+>/g, "") || ""}
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-gray-500">
//                         {new Date(
//                           blog.createdAt || blog.date
//                         ).toLocaleDateString()}
//                       </span>
//                       <span className="text-amber-700 font-medium flex items-center">
//                         Read More
//                         <svg
//                           className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M9 5l7 7-7 7"
//                           ></path>
//                         </svg>
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <div className="col-span-3 text-center p-10 bg-gray-50 rounded-lg">
//                 <p className="text-gray-500 text-lg">
//                   No educational research articles available.
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllBlogs } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await getAllBlogs();
        setBlogs(data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Get blogs organized by section
  const researchBlogs = blogs
    .filter((blog) => blog.section === "research")
    .slice(0, 3);
  const publicationBlogs = blogs
    .filter((blog) => blog.section === "publication")
    .slice(0, 3);
  const eventBlogs = blogs
    .filter((blog) => blog.section === "event")
    .slice(0, 3);
  const educationalBlogs = blogs
    .filter((blog) => blog.section === "research")
    .slice(0, 4);

  // Recent blogs for main display (most recent 6)
  const recentBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    )
    .slice(0, 6);

  // Featured blog (most recent)
  const featuredBlog = recentBlogs.length > 0 ? recentBlogs[0] : null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-700 p-6 bg-gray-100">
        <p className="font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Government Banner */}
      {/* <div className="bg-blue-900 text-white py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div>Official website of the National Research Institute</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              Accessibility
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              FOIA
            </a>
          </div>
        </div>
      </div> */}

      {/* Header with Logo and Navigation */}
      {/* <header className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="flex items-center">
                  <svg
                    className="h-10 w-10 text-blue-900"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  <div className="ml-2">
                    <div className="text-xl font-bold text-blue-900">
                      NATIONAL RESEARCH INSTITUTE
                    </div>
                    <div className="text-xs text-gray-500">
                      FEDERAL DEPARTMENT OF SCIENCE & INNOVATION
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <Link
                to="/"
                className="text-blue-900 border-b-2 border-blue-900 px-1 py-4"
              >
                HOME
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-900 px-1 py-4"
              >
                ABOUT
              </Link>
              <Link
                to="/research"
                className="text-gray-700 hover:text-blue-900 px-1 py-4"
              >
                RESEARCH
              </Link>
              <Link
                to="/publications"
                className="text-gray-700 hover:text-blue-900 px-1 py-4"
              >
                PUBLICATIONS
              </Link>
              <Link
                to="/events"
                className="text-gray-700 hover:text-blue-900 px-1 py-4"
              >
                EVENTS
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-900 px-1 py-4"
              >
                CONTACT
              </Link>
            </div>
            <div className="md:hidden">
              <button className="text-gray-700">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Search Bar */}
      {/* <div className="bg-gray-200 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="relative flex-grow max-w-lg">
              <input
                type="text"
                placeholder="Search for research, publications, events..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            {currentUser ? (
              <div className="flex items-center ml-4">
                <span className="text-sm text-gray-700 mr-2">
                  Welcome, {currentUser.name}
                </span>
                <Link
                  to="/profile"
                  className="bg-blue-900 text-white text-sm px-3 py-1 rounded hover:bg-blue-800"
                >
                  My Account
                </Link>
              </div>
            ) : (
              <div className="ml-4">
                <Link
                  to="/login"
                  className="bg-blue-900 text-white text-sm px-3 py-1 rounded hover:bg-blue-800"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div> */}

      {/* Hero Section with Featured Research */}
      {featuredBlog && (
        <section className="relative bg-gray-800 text-white">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {featuredBlog.image && (
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="w-full h-full object-cover opacity-30"
              />
            )}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-900/80"></div> */}
          </div>
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 bg-red-700 text-white text-sm font-medium mb-4">
                FEATURED RESEARCH
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {featuredBlog.title}
              </h1>
              <p className="text-lg mb-6 text-gray-100 line-clamp-3">
                {featuredBlog.content?.replace(/<[^>]+>/g, "") || ""}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/blogs/${featuredBlog._id}`}
                  className="bg-red-700 hover:bg-red-800 transition px-5 py-2 rounded inline-block font-medium"
                >
                  Read Full Article
                </Link>
                <Link
                  to={`/section/${featuredBlog.section || "recent"}`}
                  className="bg-transparent border border-white hover:bg-white hover:text-blue-900 text-white transition px-5 py-2 rounded inline-block font-medium"
                >
                  Explore Section
                </Link>
              </div>
              <div className="mt-5 text-gray-200 flex items-center text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Published on{" "}
                {new Date(
                  featuredBlog.createdAt || featuredBlog.date
                ).toLocaleDateString()}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Information Callouts */}
      <section className="bg-white border-y border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border-l-4 border-blue-900 p-4">
              <h3 className="font-bold text-blue-900 mb-1">For Researchers</h3>
              <p className="text-sm text-gray-700 mb-2">
                Access grant applications, research tools, and protocols.
              </p>
              <a
                href="#"
                className="text-sm text-blue-900 font-medium hover:underline flex items-center"
              >
                Learn More
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="bg-red-50 border-l-4 border-red-700 p-4">
              <h3 className="font-bold text-red-700 mb-1">For the Public</h3>
              <p className="text-sm text-gray-700 mb-2">
                Find information on public programs, outreach, and education.
              </p>
              <a
                href="#"
                className="text-sm text-red-700 font-medium hover:underline flex items-center"
              >
                Learn More
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-700 p-4">
              <h3 className="font-bold text-gray-700 mb-1">
                Important Updates
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Latest news on funding opportunities and policy changes.
              </p>
              <a
                href="#"
                className="text-sm text-gray-700 font-medium hover:underline flex items-center"
              >
                Learn More
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Research Sections */}
        <section className="mb-12">
          <div className="bg-white border border-gray-300 rounded">
            <div className="border-b border-gray-300 bg-gray-100 p-4">
              <h2 className="text-xl font-bold text-blue-900">
                Latest Research
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentBlogs.slice(0, 3).map((blog) => (
                  <Link
                    to={`/blogs/${blog._id}`}
                    key={blog._id}
                    className="bg-gray-50 border border-gray-200 rounded overflow-hidden flex flex-col h-full group hover:shadow-md transition"
                  >
                    <div className="relative h-40 overflow-hidden border-b border-gray-200">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      {blog.section && (
                        <div className="absolute top-2 right-2 bg-blue-900 text-white text-xs font-medium px-2 py-1 rounded uppercase">
                          {blog.section}
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-bold text-lg mb-2 text-blue-900 group-hover:text-blue-700 transition">
                        {blog.title}
                      </h3>
                      <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                        {blog.content?.replace(/<[^>]+>/g, "") || ""}
                      </p>
                    </div>
                    <div className="px-4 pb-4 pt-0 flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-500 flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {new Date(
                          blog.createdAt || blog.date
                        ).toLocaleDateString()}
                      </span>
                      <span className="text-blue-900 text-sm font-medium flex items-center">
                        Read More
                        <svg
                          className="w-3 h-3 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/research"
                  className="inline-block bg-blue-900 text-white px-5 py-2 rounded font-medium hover:bg-blue-800 text-sm"
                >
                  View All Research
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Research Publications */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="border-b border-gray-300 bg-gray-100 p-4 flex items-center justify-between">
                <h3 className="font-bold text-blue-900">
                  Research Publications
                </h3>
                <Link
                  to="/section/publication"
                  className="text-sm text-blue-900 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="p-4 divide-y divide-gray-200">
                {publicationBlogs.length > 0 ? (
                  publicationBlogs.map((blog) => (
                    <Link
                      to={`/blogs/${blog._id}`}
                      key={blog._id}
                      className="block group py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-start">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-16 h-16 object-cover border border-gray-200 mr-3"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center mr-3">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-blue-900 group-hover:text-blue-700 transition text-sm">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              blog.createdAt || blog.date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm py-4">
                    No publications available.
                  </p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="border-b border-gray-300 bg-gray-100 p-4 flex items-center justify-between">
                <h3 className="font-bold text-blue-900">Upcoming Events</h3>
                <Link
                  to="/section/event"
                  className="text-sm text-blue-900 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="p-4 divide-y divide-gray-200">
                {eventBlogs.length > 0 ? (
                  eventBlogs.map((blog) => (
                    <Link
                      to={`/blogs/${blog._id}`}
                      key={blog._id}
                      className="block group py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-start">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-16 h-16 object-cover border border-gray-200 mr-3"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center mr-3">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M19 4h-2V2h-2v2H9V2H7v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M16 10H8M16 14H8"
                              />
                            </svg>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-blue-900 group-hover:text-blue-700 transition text-sm">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              blog.createdAt || blog.date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm py-4">
                    No upcoming events available.
                  </p>
                )}
              </div>
            </div>

            {/* News & Announcements */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="border-b border-gray-300 bg-gray-100 p-4 flex items-center justify-between">
                <h3 className="font-bold text-blue-900">
                  News & Announcements
                </h3>
                <Link
                  to="/news"
                  className="text-sm text-blue-900 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="p-4 divide-y divide-gray-200">
                {researchBlogs.length > 0 ? (
                  researchBlogs.map((blog) => (
                    <Link
                      to={`/blogs/${blog._id}`}
                      key={blog._id}
                      className="block group py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-start">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-16 h-16 object-cover border border-gray-200 mr-3"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center mr-3">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M15 11l3 3m0 0l3-3m-3 3V5"
                              />
                            </svg>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-blue-900 group-hover:text-blue-700 transition text-sm">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              blog.createdAt || blog.date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm py-4">
                    No announcements available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Educational Resources */}
        <section className="mb-12">
          <div className="bg-white border border-gray-300 rounded">
            <div className="border-b border-gray-300 bg-gray-100 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-900">
                Educational Resources
              </h2>
              <Link
                to="/section/research"
                className="text-sm text-blue-900 hover:underline flex items-center"
              >
                View All Resources
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {educationalBlogs.length > 0 ? (
                  educationalBlogs.map((blog) => (
                    <Link
                      to={`/blogs/${blog._id}`}
                      key={blog._id}
                      className="bg-gray-50 border border-gray-200 rounded overflow-hidden group hover:shadow-md transition"
                    >
                      <div className="h-32 overflow-hidden border-b border-gray-200">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 text-blue-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-blue-900 group-hover:text-blue-700 transition text-sm mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-700 text-xs line-clamp-2 mb-2">
                          {blog.content?.replace(/<[^>]+>/g, "") || ""}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {new Date(
                              blog.createdAt || blog.date
                            ).toLocaleDateString()}
                          </span>
                          <span className="text-blue-900 text-xs font-medium flex items-center">
                            View Resource
                            <svg
                              className="w-3 h-3 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-4 text-center p-6 bg-gray-50 border border-gray-200 rounded">
                    <p className="text-gray-500">
                      No educational resources available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Information Cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded p-6">
              <div className="flex items-start mb-4">
                <div className="bg-blue-900 p-2 rounded mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-1">
                    Compliance & Standards
                  </h3>
                  <p className="text-sm text-gray-700">
                    Access official standards, protocols, and compliance
                    documentation.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-900 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-blue-900 hover:underline">
                    Research Ethics Guidelines
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-900 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-blue-900 hover:underline">
                    Data Sharing Policies
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-900 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-blue-900 hover:underline">
                    Regulatory Standards
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded p-6">
              <div className="flex items-start mb-4">
                <div className="bg-red-700 p-2 rounded mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-700 mb-1">
                    Publications & Reports
                  </h3>
                  <p className="text-sm text-gray-700">
                    Download official reports, white papers, and annual reviews.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-red-700 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-red-700 hover:underline">
                    Annual Research Report
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-red-700 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-red-700 hover:underline">
                    Strategic Policy Documents
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-red-700 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-red-700 hover:underline">
                    Statistical Briefings
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded p-6">
              <div className="flex items-start mb-4">
                <div className="bg-gray-700 p-2 rounded mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-1">
                    Outreach & Programs
                  </h3>
                  <p className="text-sm text-gray-700">
                    Learn about our community engagement and public programs.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-700 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-gray-700 hover:underline">
                    Educational Programs
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-700 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-gray-700 hover:underline">
                    Public Lectures Series
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-700 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <a href="#" className="text-gray-700 hover:underline">
                    Community Partnerships
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-12">
          <div className="bg-blue-900 text-white rounded overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-xl font-bold mb-2">Stay Informed</h3>
                <p className="text-blue-100 text-sm md:text-base">
                  Subscribe to our newsletter for updates on research findings,
                  events, and funding opportunities.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 rounded text-gray-800 text-sm w-full sm:min-w-[300px]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-red-700 hover:bg-red-800 px-6 py-2 rounded font-medium text-sm"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-blue-200 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
