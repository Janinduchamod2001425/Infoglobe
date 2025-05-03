import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { Toaster } from "react-hot-toast";
import { CountryProvider } from "./context/country.context.jsx";

// Animation
import Lottie from "lottie-react";
import loadingAnimation from "./assets/earth.json";
import CountryDetailPage from "./components/CountryDetailPage.jsx";
import FavoritesPage from "./components/FavoritesPage.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  });

  if (loading) {
    return (
        <div className="bg-gradient-to-r via-green-100 from-blue-100 to-yellow-100 flex justify-center items-center min-h-screen">
          <Lottie
              animationData={loadingAnimation}
              loop={true}
              style={{ width: "180px", height: "180px" }}
          />
        </div>
    );
  }

  return (
      <div>
        <CountryProvider>
          <Routes>
            {/*Public Routes*/}
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/*Private Routes*/}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/country/:code" element={<CountryDetailPage />} />
              <Route path="/favorites" element= {<FavoritesPage/>}  />
            </Route>
          </Routes>
        </CountryProvider>
        <Toaster />
      </div>
  );
};
export default App;
