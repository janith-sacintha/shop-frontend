import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function RegisterPage(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    async function handleRegister() {
        if (isSubmitting) return;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
                firstName,
                lastName,
                email,
                password
            });
            toast.success("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(error.response?.data?.message || "An error occurred during registration");
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleRegister();
        }
    }

    return(
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-orange-200 p-8 flex flex-col items-center gap-6">
                <h1 className="text-4xl font-extrabold text-orange-600 mb-4">Register</h1>
                <p className="text-gray-500 text-center mb-6">
                    Please fill in the form to create an account
                </p>
                <input className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
                    type="text"
                    placeholder="First name"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
                    type="text"
                    placeholder="Last name"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
                    type="password"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className="cursor-pointer w-full py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleRegister}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </div>
        </div>
    )
}