import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate inside the component
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const [error, setError] = useState(""); // State for handling errors

  const handleChanges = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const { data: res } = await axios.post("http://localhost:3000/signup", data);
      navigate("/login"); // Navigate to login page on successful signup
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div
        className="border-2 rounded-lg shadow-lg h-96 w-4/5 max-w-4xl bg-white flex flex-row font-sans"
        style={{ borderColor: "#32a59d" }}
      >
        {/* Left box */}
        <div className="w-2/4 bg-emerald-500 p-6 flex flex-col justify-center items-center gap-y-8 rounded-l-lg">
          <h1 className="text-white text-3xl font-semibold text-center">
            Welcome Back
          </h1>
          <Link to="/login">
            <button
              type="button"
              className="border p-2 rounded-full bg-white text-emerald-500 w-40 font-medium hover:bg-emerald-600 hover:text-white transition duration-300"
            >
              Sign in
            </button>
          </Link>
        </div>
        {/* Right Box */}
        <div className="flex flex-col p-6 items-center justify-center gap-y-8 w-full">
          <form
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-6 text-center w-full"
          >
            <h1 className="text-3xl font-semibold text-gray-700">
              Create Account
            </h1>
            {/* Input Fields */}
            <div className="flex flex-col justify-center items-center gap-4">
              {/* First name */}
              <input
                type="text"
                name="FirstName"
                className="bg-gray-200 p-3 rounded-lg w-72 text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none transition duration-300"
                placeholder="First Name"
                onChange={handleChanges}
                value={data.FirstName}
                required
              />

              {/* LastName */}
              <input
                type="text"
                name="LastName"
                className="bg-gray-200 p-3 rounded-lg w-72 text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none transition duration-300"
                placeholder="Last Name"
                onChange={handleChanges}
                value={data.LastName}
                required
              />

              {/* Email */}
              <input
                type="email"
                name="Email"
                className="bg-gray-200 p-3 rounded-lg w-72 text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none transition duration-300"
                placeholder="Email"
                onChange={handleChanges}
                value={data.Email}
                required
              />

              {/* Password */}
              <input
                type="password"
                name="Password"
                className="bg-gray-200 p-3 rounded-lg w-72 text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none transition duration-300"
                placeholder="Password"
                onChange={handleChanges}
                value={data.Password}
                required
              />
              {/* Error message */}
              {error && <div className="text-red-500">{error}</div>}

              {/* Submit Button */}
              <button
                type="submit"
                className="border p-3 rounded-full bg-emerald-500 text-white w-48 font-medium hover:bg-emerald-600 transition duration-300"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
