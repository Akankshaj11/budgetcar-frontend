import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCarSide, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
        setError("Please fill in all fields.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
    }

    try {
        setIsLoading(true);

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        navigate("/admin/dashboard");
    } catch (error) {
        switch (error.code) {
            case "auth/user-not-found":
                setError("No user found with this email.");
                break;

            case "auth/wrong-password":
                setError("Incorrect password.");
                break;

            case "auth/invalid-email":
                setError("Invalid email address.");
                break;

            case "auth/invalid-credential":
                setError("Invalid email or password.");
                break;

            default:
                setError(error.message);
        }

        console.log(error);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <main className="min-h-screen bg-[#0a0a0c] relative flex items-center justify-center px-6 overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gray-800/10 rounded-full blur-3xl -z-10 animate-pulse duration-5000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-900/20 rounded-full blur-3xl -z-10 animate-pulse duration-7000"></div>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white transition duration-300 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md cursor-pointer"
      >
        <FaArrowLeft className="text-[10px]" /> Back to Home
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/3 backdrop-blur-2xl border border-white/8 shadow-2xl p-8 md:p-10 rounded-3xl flex flex-col items-center">
        
        {/* Logo and title */}
        <div className="flex items-center gap-3 mb-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 rounded-xl bg-white text-gray-950 flex items-center justify-center shadow-lg shadow-white/10">
            <FaCarSide size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold leading-none text-white tracking-tight">
              Budget Car
            </h2>
            <p className="uppercase text-[9px] tracking-[2px] text-gray-500 font-bold mt-1">
              Admin Portal
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-white text-center mt-6 mb-1">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          Sign in to manage your budget car inventory.
        </p>

        {/* Error Message */}
        {error && (
          <div className="w-full mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold leading-relaxed flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          
          {/* Email Input */}
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition duration-300">
              <FaEnvelope size={14} />
            </span>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full pl-11 pr-4 py-3.5 text-sm bg-white/2 border border-white/8 rounded-2xl text-white outline-none focus:border-white/30 focus:bg-white/4 transition duration-300 placeholder-gray-600 disabled:opacity-50"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition duration-300">
              <FaLock size={14} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full pl-11 pr-12 py-3.5 text-sm bg-white/2 border border-white/8 rounded-2xl text-white outline-none focus:border-white/30 focus:bg-white/4 transition duration-300 placeholder-gray-600 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition duration-300 cursor-pointer disabled:opacity-50"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-xs font-semibold text-gray-500 hover:text-white transition duration-300">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-white text-gray-950 font-bold text-sm tracking-wide shadow-lg shadow-white/5 hover:scale-[1.02] hover:bg-gray-100 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-gray-950" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        <p className="text-xs text-gray-600 text-center mt-8">
          Authorized personnel only. Access strictly monitored.
        </p>

      </div>
    </main>
  );
};

export default AdminLogin;
