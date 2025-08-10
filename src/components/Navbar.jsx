// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { currentUser, logout } = useAuth();

// //   return (
// //     <nav className="bg-white shadow">
// //       <div className=" mx-auto px-4 flex justify-between h-16 items-center">
// //         <div className="flex space-x-4">
// //           <Link to="/" className="text-xl font-bold text-indigo-600">
// //             OrgWebsite
// //           </Link>
// //           <Link to="/blogs" className="text-gray-700 hover:text-indigo-600">
// //             Blogs
// //           </Link>
// //           <Link to="/events" className="text-gray-700 hover:text-indigo-600">
// //             Events
// //           </Link>
// //           <Link to="/contact" className="text-gray-700 hover:text-indigo-600">
// //             Contact
// //           </Link>
// //         </div>
// //         <div className="flex items-center space-x-4">
// //           {currentUser ? (
// //             <>
// //               <span className="text-gray-700">Hi, {currentUser.name}</span>
// //               <button
// //                 onClick={logout}
// //                 className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <Link
// //               to="/login"
// //               className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
// //             >
// //               Login
// //             </Link>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { currentUser, logout } = useAuth();

// //   return (
// //     <nav className="bg-white shadow">
// //       <div className="mx-auto px-4 flex justify-between h-16 items-center">
// //         <div className="flex space-x-4">
// //           <Link to="/" className="text-xl font-bold text-indigo-600">
// //             OrgWebsite
// //           </Link>
// //           <Link to="/blogs" className="text-gray-700 hover:text-indigo-600">
// //             Blogs
// //           </Link>
// //           <Link to="/events" className="text-gray-700 hover:text-indigo-600">
// //             Events
// //           </Link>
// //           <Link to="/contact" className="text-gray-700 hover:text-indigo-600">
// //             Contact
// //           </Link>

// //           {/* Show Create Blog only if user is admin */}
// //           {currentUser && currentUser.role === "admin" && (
// //             <Link
// //               to="/create-blog"
// //               className="text-gray-700 hover:text-indigo-600"
// //             >
// //               Create Blog
// //             </Link>
// //           )}
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           {currentUser ? (
// //             <>
// //               <span className="text-gray-700">Hi, {currentUser.name}</span>
// //               <button
// //                 onClick={logout}
// //                 className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <Link
// //               to="/login"
// //               className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
// //             >
// //               Login
// //             </Link>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Handle navbar background on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Check if a link is active
//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <nav
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//         scrolled ? "bg-white shadow-md" : "bg-white shadow"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo and Brand */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <span className="text-2xl font-bold text-blue-700">
//                 Research Institute
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             <Link
//               to="/"
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 isActive("/")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               to="/blogs"
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 isActive("/blogs")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//             >
//               Research Articles
//             </Link>
//             <Link
//               to="/events"
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 isActive("/events")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//             >
//               Events
//             </Link>
//             <Link
//               to="/about"
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 isActive("/about")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//             >
//               About Us
//             </Link>
//             <Link
//               to="/contact"
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 isActive("/contact")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//             >
//               Contact
//             </Link>
//             <Link
//               to="/section/publication"
//               className="text-gray-700 hover:text-black"
//             >
//               Publication
//             </Link>

//             {/* Admin Links */}
//             {currentUser && currentUser.role === "admin" && (
//               <div className="relative group">
//                 <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none">
//                   Admin
//                   <svg
//                     className="ml-1 w-4 h-4 inline-block"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     ></path>
//                   </svg>
//                 </button>
//                 <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
//                   <Link
//                     to="/create-blog"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//                   >
//                     Create Article
//                   </Link>
//                   <Link
//                     to="/manage-blogs"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//                   >
//                     Manage Articles
//                   </Link>
//                   <Link
//                     to="/manage-events"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//                   >
//                     Manage Events
//                   </Link>
//                   <Link
//                     to="/section/blog"
//                     className="text-gray-700 hover:text-black"
//                   >
//                     Blog
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Authentication */}
//           <div className="hidden md:flex items-center space-x-4">
//             {currentUser ? (
//               <div className="flex items-center">
//                 <div className="mr-4 text-sm text-gray-700">
//                   Welcome,{" "}
//                   <span className="font-medium">{currentUser.name}</span>
//                 </div>
//                 <button
//                   onClick={logout}
//                   className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-md transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-md transition-colors"
//               >
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               {!isMenuOpen ? (
//                 <svg
//                   className="block h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="block h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <Link
//               to="/"
//               className={`block px-3 py-2 rounded-md text-base font-medium ${
//                 isActive("/")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/blogs"
//               className={`block px-3 py-2 rounded-md text-base font-medium ${
//                 isActive("/blogs")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Research Articles
//             </Link>
//             <Link
//               to="/events"
//               className={`block px-3 py-2 rounded-md text-base font-medium ${
//                 isActive("/events")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Events
//             </Link>
//             <Link
//               to="/about"
//               className={`block px-3 py-2 rounded-md text-base font-medium ${
//                 isActive("/about")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               About Us
//             </Link>
//             <Link
//               to="/contact"
//               className={`block px-3 py-2 rounded-md text-base font-medium ${
//                 isActive("/contact")
//                   ? "text-blue-700 bg-blue-50"
//                   : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Contact
//             </Link>

//             {/* Admin Links for Mobile */}
//             {currentUser && currentUser.role === "admin" && (
//               <>
//                 <div className="px-3 py-2 text-base font-medium text-gray-700">
//                   Admin Options
//                 </div>
//                 <Link
//                   to="/create-blog"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 pl-6"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Create Article
//                 </Link>
//                 <Link
//                   to="/manage-blogs"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 pl-6"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Manage Articles
//                 </Link>
//                 <Link
//                   to="/manage-events"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 pl-6"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Manage Events
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Auth for Mobile */}
//           <div className="pt-4 pb-3 border-t border-gray-200">
//             {currentUser ? (
//               <div className="px-2 space-y-3">
//                 <div className="px-3 text-base font-medium text-gray-700">
//                   Welcome, {currentUser.name}
//                 </div>
//                 <button
//                   onClick={() => {
//                     logout();
//                     setIsMenuOpen(false);
//                   }}
//                   className="w-full flex justify-center bg-blue-700 hover:bg-blue-800 text-white text-base px-4 py-2 rounded-md transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="px-2">
//                 <Link
//                   to="/login"
//                   className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white text-base px-4 py-2 rounded-md transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full">
      {/* Top bar with dark background */}
      {/* <div className="w-full bg-[#1B325F] text-white py-2">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm">
          <div>Official Website of the Research Institute</div>
          <div className="hidden md:flex space-x-4">
            <a href="#accessibility" className="hover:underline">
              Accessibility
            </a>
            <a href="#help" className="hover:underline">
              Help
            </a>
          </div>
        </div>
      </div> */}

      {/* Main Navigation */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-20 items-center">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                {/* You can add a government seal/logo image here */}
                <span className="text-xl font-serif text-[#1B325F]">
                  Research Institute
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex space-x-1">
                {[
                  { path: "/", label: "Home" },
                  { path: "/blogs", label: "articles" },
                  { path: "/section/event", label: "Events" },
                  { path: "/about", label: "About-Us" },
                  { path: "/contact", label: "Contact" },
                  { path: "/section/publication", label: "Publication" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 text-sm font-medium ${
                      isActive(item.path)
                        ? "text-[#1B325F] bg-gray-100 border-b-2 border-[#1B325F]"
                        : "text-gray-700 hover:text-[#1B325F] hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Admin Dropdown */}
                {currentUser && currentUser.role === "admin" && (
                  <div className="relative group">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1B325F] hover:bg-gray-50 flex items-center">
                      Admin
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-b-md shadow-lg py-1 z-10 hidden group-hover:block">
                      <Link
                        to="/create-blog"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1B325F]"
                      >
                        Create Article
                      </Link>
                      <Link
                        to="/manage-blogs"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1B325F]"
                      >
                        Manage Articles
                      </Link>
                      <Link
                        to="/manage-events"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1B325F]"
                      >
                        Manage Events
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Authentication */}
              <div className="ml-6 flex items-center">
                {currentUser ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      Welcome, {currentUser.name}
                    </span>
                    <button
                      onClick={logout}
                      className="bg-[#1B325F] hover:bg-[#2C4875] text-white text-sm px-4 py-2 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="bg-[#1B325F] hover:bg-[#2C4875] text-white text-sm px-4 py-2 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#1B325F] hover:bg-gray-50"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {[
                { path: "/", label: "Home" },
                { path: "/blogs", label: "Research Articles" },
                { path: "/events", label: "Events" },
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact" },
                { path: "/section/publication", label: "Publication" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium ${
                    isActive(item.path)
                      ? "text-[#1B325F] bg-gray-50 border-l-4 border-[#1B325F]"
                      : "text-gray-700 hover:text-[#1B325F] hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Admin Links for Mobile */}
              {currentUser && currentUser.role === "admin" && (
                <>
                  <div className="px-3 py-2 text-base font-medium text-gray-700">
                    Admin Options
                  </div>
                  {[
                    { path: "/create-blog", label: "Create Article" },
                    { path: "/manage-blogs", label: "Manage Articles" },
                    { path: "/manage-events", label: "Manage Events" },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1B325F] hover:bg-gray-50 pl-6"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              )}
            </div>

            {/* Mobile Auth */}
            <div className="pt-4 pb-3 border-t border-gray-200 px-4">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="text-base font-medium text-gray-700">
                    Welcome, {currentUser.name}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-[#1B325F] hover:bg-[#2C4875] text-white text-base px-4 py-2 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center bg-[#1B325F] hover:bg-[#2C4875] text-white text-base px-4 py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
