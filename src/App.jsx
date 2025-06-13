import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ManaenaduBackground from "./components/ManaenaduBackground"; // ✅ Import animated background

const Home = lazy(() => import("./pages/Home"));
const PostPage = lazy(() => import("./pages/PostPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));

function App() {
  return (
    <Router>
      {/* Background is always present behind all content */}
      <ManaenaduBackground />

      <div className="flex flex-col min-h-screen relative z-10">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Suspense
            fallback={<div className="text-center py-8">Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
