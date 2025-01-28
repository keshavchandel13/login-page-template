import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post("http://localhost:3000/signup", data);
      navigate("/login");
      console.log(res.message); // Log success message from the server
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full"
        style={{ borderColor: "#32a59d", borderWidth: "2px" }}
      >
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-emerald-500 flex flex-col justify-center items-center p-8 text-center">
          <h1 className="text-white text-3xl font-semibold mb-4">
            Welcome Back!
          </h1>
          <p className="text-white text-lg mb-6">
            Already have an account? Sign in now!
          </p>
          <Link to="/login">
            <button
              type="button"
              className="bg-white text-emerald-500 px-6 py-2 rounded-full font-medium hover:bg-emerald-600 hover:text-white transition duration-300"
            >
              Sign In
            </button>
          </Link>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={data.FirstName}
              onChange={handleChanges}
              className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              required
            />

            {/* Last Name */}
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={data.LastName}
              onChange={handleChanges}
              className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={data.Email}
              onChange={handleChanges}
              className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={data.Password}
              onChange={handleChanges}
              className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              required
            />

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
