import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ Email: "", Password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: res } = await axios.post("http://localhost:3000/login", data);
      localStorage.setItem("token", res.token);
      navigate("/"); // Redirect to homepage or dashboard after login
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="border-2 rounded-lg shadow-lg h-96 w-4/5 max-w-4xl bg-white flex flex-row font-sans" style={{ borderColor: "#32a59d" }}>
        {/* Left Box */}
        <div className="flex flex-col p-6 items-center justify-center gap-y-8 w-full">
          <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-y-6 text-center w-full">
            <h1 className="text-3xl font-semibold text-gray-700">Login to Your Account</h1>
            {/* Input Fields */}
            <div className="flex flex-col justify-center items-center gap-4">
              <input
                type="email"
                name="Email"
                className="bg-gray-200 p-3 rounded-lg w-72 text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none transition duration-300"
                placeholder="Email"
                onChange={handleChanges}
                value={data.Email}
                required
              />
              <input
                type="password"
                name="Password"
                className="bg-gray-200 p-3 rounded-lg w-72 text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none transition duration-300"
                placeholder="Password"
                onChange={handleChanges}
                value={data.Password}
                required
              />
              <button
                type="submit"
                className="border p-3 rounded-full bg-emerald-500 text-white w-48 font-medium hover:bg-emerald-600 transition duration-300"
              >
                Sign in
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </div>
        {/* Right Box */}
        <div className="w-2/4 bg-emerald-500 p-6 flex flex-col justify-center items-center gap-y-8 rounded-l-lg">
          <h1 className="text-white text-3xl font-semibold text-center">Not a User?</h1>
          <Link to="/signup">
            <button
              type="button"
              className="border p-2 rounded-full bg-white text-emerald-500 w-40 font-medium hover:bg-emerald-600 hover:text-white transition duration-300"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
