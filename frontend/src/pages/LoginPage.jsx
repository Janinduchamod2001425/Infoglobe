import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, signInWithEmailAndPassword } from "../config/firebase.js"; // Import Firebase methods

import bgImage from "../assets/Login Page - InfoGlobe.svg";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Store the auth token and user details
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));

      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <div
          className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
      >
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6"
        >
          <h2 className="text-3xl font-medium text-gray-800 mb-[-10px]">Log In</h2>

          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                Email address
              </label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                />
                <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-[19px] transform -translate-y-1/2"
                >
                  {passwordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>

          <button
              type="submit"
              className={`w-full py-2 text-white text-sm font-medium rounded-full transition duration-300 ease-in-out ${
                  loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
  );
};

export default LoginPage;
