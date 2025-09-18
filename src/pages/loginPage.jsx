import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful");

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials, try again!");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold text-white mb-4">Welcome Back</h1>
        <p className="text-white/70 text-center mb-6">
          Please enter your credentials to continue
        </p>

        {/* Email */}
        <div className="w-full">
          <label className="block text-white/80 text-sm mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block text-white/80 text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="cursor-pointer w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Register link */}
        <p className="text-white/80 text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-300 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
