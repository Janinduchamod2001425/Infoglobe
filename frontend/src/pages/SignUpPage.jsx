import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from "../config/firebase.js";

import bgImage from "../assets/SignUp Page - InfoGlobe.svg";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // Use Firebase to create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Store user data in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      // Store user data in local storage
      localStorage.setItem("authToken", user.accessToken);
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, name }));

      toast.success("Welcome to InfoGlobe!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Signup failed");
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
            onSubmit={handleSignUp}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6"
        >
          <h2 className="text-3xl font-medium text-gray-800 mb-[-10px]">Sign up</h2>

          <p className="text-xs text-gray-500">
            Create an account or{" "}
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Sign In
            </Link>
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
              />
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                />
                <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute right-3 top-[19px] transform -translate-y-1/2"
                >
                  {confirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>

          <button
              type="submit"
              className={`w-full py-2 text-white text-sm font-medium rounded-full transition duration-300 ease-in-out ${
                  loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
            By Signing up, you accept our{" "}
            <Link to="/terms" className="text-green-600 hover:underline">
              terms of service
            </Link>{" "}
            and <br />
            <Link to="/privacy" className="text-green-600 hover:underline">
              privacy policy
            </Link>
          </p>
        </form>
      </div>
  );
};

export default SignUpPage;
