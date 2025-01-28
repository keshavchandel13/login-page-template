import React from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-emerald-500 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* App Title */}
          <h1 className="text-white text-2xl font-semibold">Fakebook</h1>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-white text-emerald-500 px-4 py-2 rounded-full font-medium hover:bg-emerald-600 hover:text-white transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content Section */}
      <main className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Fakebook!
        </h2>
        <p className="text-gray-600 text-lg">
          Explore your feed, connect with friends, and stay updated.
        </p>
      </main>
    </div>
  );
}
