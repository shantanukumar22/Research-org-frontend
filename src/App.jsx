// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import "./App.css";
import Layout from "./components/Layout";
import BlogForm from "./components/BlogForm";
import BlogDetail from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SectionPage from "./pages/sectionPage"; // create this page
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Photography from "./pages/Photography";
import PhotographyForm from "./components/PhotographyForm";
import PhotographyDetail from "./pages/PhotographyDetail";
import Programmes from "./pages/Programmes";
import Publications from "./pages/Publications";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/team"
            element={
              <Layout>
                <Team />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route path="/edit-blog/:id" element={<EditBlog />} />

          <Route
            path="/section/:sectionType"
            element={
              <Layout>
                <SectionPage />
              </Layout>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Layout>
                <BlogDetail />
              </Layout>
            }
          />
          <Route
            path="/create-blog"
            element={
              <ProtectedRoute>
                <Layout>
                  <BlogForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/photography"
            element={
              <Layout>
                <Photography />
              </Layout>
            }
          />
          <Route
            path="/create-photography"
            element={
              <ProtectedRoute>
                <Layout>
                  <PhotographyForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/photography/:id"
            element={
              <Layout>
                <PhotographyDetail />
              </Layout>
            }
          />
          <Route
            path="/programmes"
            element={
              <Layout>
                <Programmes />
              </Layout>
            }
          />
          <Route
            path="/publications"
            element={
              <Layout>
                <Publications />
              </Layout>
            }
          />
          <Route
            path="/events"
            element={
              <Layout>
                <Events />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
