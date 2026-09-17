import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google-login`, {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success("Google login successful");
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Google login failed:", error);
          toast.error("Google login failed");
        });
    }
  });

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
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-orange-200 p-8 flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-4">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-6">
          Please enter your credentials to continue
        </p>

        {/* Email */}
        <div className="w-full">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="cursor-pointer w-full py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-600 transition"
        >
          Login
        </button>
        {/* Google Login Button */}
        <button
          onClick={() => googleLogin()}
          className="cursor-pointer w-full py-3 bg-white text-orange-600 font-semibold rounded-xl shadow-lg border border-orange-400 hover:bg-orange-50 transition"
        >
          Login with Google
        </button>

        {/* Register link */}
        <p className="text-gray-600 text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-600 font-semibold hover:underline">
            Sign up
          </Link>
          <Link to="/forget" className="text-orange-600 font-semibold hover:underline ml-4">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
