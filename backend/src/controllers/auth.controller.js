import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { generateToken } from "../utils/generateToken.util.js";

// Signup user
export const signUpUser = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  // Validate input
  if (!email || !password || !confirmPassword || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Create a new user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Save user details in Firestore with 'uid' as the document ID
    const userDocRef = doc(db, "users", user.uid); // Use UID as document ID
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      name: name,
      joinDate: new Date().toISOString(),
    });

    // await addDoc(collection(db, "users") -->  Automatically generates a unique document ID for each new document

    // Generate and send token
    generateToken(user.uid, res);

    // Respond with a success message
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in SignUp User:", error.message);

    // Handle Firebase errors
    if (error.code === "auth/email-already-in-use") {
      return res.status(400).json({ message: "Email is already in use" });
    } else if (error.code === "auth/weak-password") {
      return res.status(400).json({ message: "Password is too weak" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  // Login user with Firebase Authentication
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const firebaseUser = userCredential.user;

    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

    if (!userDoc.exists()) {
      return res.status(404).json({ message: "User data not found" });
    }

    const userData = userDoc.data();

    // Generate token
    generateToken(firebaseUser.uid, res);

    // Respond with user data
    res.status(200).json({
      message: "Login Successful",
      user: {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: userData.name || firebaseUser.email.split("@")[0],
        // Include any other user data you need
      },
    });
  } catch (error) {
    console.error("Error in Login User:", error.message);

    // Handle Firebase errors
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ message: "User not found" });
    } else if (error.code === "auth/wrong-password") {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    await signOut(auth);

    res.clearCookie("token");

    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error("Error in Logout User", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  const { uid } = req.params;

  // Validate input
  if (!uid) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Reference the Firestore document for the user
    const userDocRef = doc(db, "users", uid);

    // Fetch user data
    const userDoc = await getDoc(userDocRef);

    // Check if user document exists
    if (!userDoc.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user profile
    res.status(200).json({ uid: userDoc.uid, ...userDoc.data() });
  } catch (error) {
    console.error("Error fetching user profile: ", error.message);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};
