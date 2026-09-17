import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() { 
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    
    async function sendOTP() {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/send-otp`, { email });
            toast.success("OTP sent successfully");
            setEmailSent(true);
        } catch (error) {
            toast.error("Failed to send OTP");
        }
    }

    async function resetPassword() {
        if (!otp || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password`, { email, otp, newPassword });
            toast.success("Password reset successfully");
            setEmailSent(false);
            setEmail("");
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to reset password");
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700">
            {!emailSent && <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6">
                <h1 className="text-4xl font-extrabold text-white mb-4">Forgot Password</h1>
                <p className="text-white/70 text-center mb-6">
                    Please enter your email to reset your password
                </p>
            <input className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
            <button onClick={sendOTP} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300">
                Send OTP
            </button>
            </div>}

            {emailSent && <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6">
                <h1 className="text-4xl font-extrabold text-white mb-4">Check Your Email</h1>
                <p className="text-white/70 text-center mb-6">We've sent an OTP to your email. Please check your inbox and enter the code below.</p>
                <input className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                />
                <input className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                />
                <input className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={resetPassword} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300">
                    Reset Password
                </button>
            </div>}

        </div>
    )
}