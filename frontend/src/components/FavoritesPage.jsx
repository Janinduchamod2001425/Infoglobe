import { useEffect, useState } from "react";
import { useCountries } from "../context/country.context";
import CountryCard from "../components/CountryCard";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CgProfile } from "react-icons/cg";
import Logo from "/earth.svg";
import DesktopHero from "../assets/desktop.svg";
import MobileHero from "../assets/mobile.svg";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import LoadingAnimation from "../assets/earth.json";

const FavoritesPage = () => {
  const { getFavorites } = useCountries();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // Get user from localStorage
  const getUserFromLocalStorage = () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData || userData === "undefined") return null;
      const parsedData = JSON.parse(userData);
      return parsedData.user ? parsedData.user : parsedData;
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast.error("Error loading user data");
      return null;
    }
  };

  const user = getUserFromLocalStorage();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        if (user) {
          const favs = await getFavorites(user.uid);
          setFavoriteCountries(favs);
        }
      } catch (error) {
        toast.error("Error loading favorites");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadFavorites();
      } else {
        setFavoriteCountries([]);
      }
    });

    return () => unsubscribe();
  }, [getFavorites, auth]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-gradient-to-r via-green-50 from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="absolute inset-x-0 top-3 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo & Title */}
          <div className="flex lg:flex-1 ml-0.5 sm:ml-60">
            <div className="flex justify-center items-center mr-2">
              <a href="/dashboard" className="-m-1.5 p-1.5">
                <img
                  alt="Country Explorer Logo"
                  src={Logo}
                  className="h-10 w-auto"
                />
              </a>
              <p className="ml-2 font-bold sm:text-lg font-gloria">
                <span className="sm:text-3xl text-3xl font-caveat">Info </span>
                globe
              </p>
            </div>
          </div>

          <Link
            to="/favorites"
            className="lg:hidden text-md text-gray-400 hover:text-gray-700 font-macondo font-bold sm:mt-1 -mr-10 mt-2"
          >
            My Favorites
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-black bg-lime-400 bg-opacity-80 shadow-sm hover:bg-opacity-100 transition-all mr-2"
            >
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Profile - Shows logged-in user */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end mr-36">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <CgProfile className="text-xl mr-2" />
                <span className="text-md font-semibold text-gray-900">
                  {user?.name || user?.username || user?.email || "Welcome"}
                </span>
              </div>
              <Link
                to="/dashboard"
                className="text-md text-gray-600 hover:text-gray-700 font-macondo font-bold sm:mt-1 bg-green-200 px-2 rounded-full"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className="text-md text-gray-600 hover:text-gray-700 font-macondo font-bold sm:mt-1 bg-green-200 px-2 rounded-full"
              >
                My Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="text-md text-gray-500 hover:text-red-500 transition-colors font-macondo font-bold sm:mt-1"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-r via-green-50 from-blue-50 to-yellow-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div className="flex justify-center items-center mr-2">
                <a href="/dashboard" className="-m-1.5 p-1.5">
                  <img
                    alt="Country Explorer Logo"
                    src={Logo}
                    className="h-8 w-auto"
                  />
                </a>
                <p className="ml-2 font-bold">
                  <span className="sm:text-3xl text-3xl font-caveat">
                    Info{" "}
                  </span>
                  globe
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-white py-1 px-4 bg-blue-500 rounded-full hover:text-gray-700 -mr-20 mt-0.5"
              >
                Logout
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="m-2 rounded-full p-1.5 text-white bg-blue-500 bg-opacity-80 hover:bg-opacity-100 transition-all"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900">
                    <p className="text-center font-macondo text-xl">
                      "The world is a book, and those who do not travel read
                      only one page."
                    </p>
                    <p className="text-center mt-2 text-sm font-caveat">
                      – Saint Augustine -
                    </p>

                    <div className="flex justify-center items-center">
                      <Lottie
                        animationData={LoadingAnimation}
                        loop={true}
                        style={{ width: 600, height: 600 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Banner Section */}
      <div className="relative">
        {/* Responsive Hero Images */}
        <div className="hidden md:block w-full h-[600px]">
          <img
            src={DesktopHero}
            alt="World Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <div className="md:hidden w-full h-[400px]">
          <img
            src={MobileHero}
            alt="World Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Centered Content Over Banner */}
        <div className="absolute inset-0 flex items-center justify-center sm:mt-0 mt-[500px]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 text-center">
            <h1 className="sm:text-8xl text-5xl font-bold tracking-tight sm:text-gray-600 text-black drop-shadow-lg font-caveat">
              Your Favorite Countries
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 sm:text-white/90 text-gray-700 drop-shadow-md">
              All your saved countries in one place
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:mt-0 mt-40">
        {favoriteCountries.length === 0 ? (
          <div className="text-center py-12">
            <p className=" text-gray-600 mb-3 font-caveat text-4xl">
              {auth.currentUser
                ? "You haven't added any favorites yet"
                : "Please log in to view your favorites"}
            </p>
            <button
              onClick={() =>
                navigate(auth.currentUser ? "/dashboard" : "/login")
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {auth.currentUser ? "Browse Countries" : "Log In"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteCountries.map((fav) => (
              <CountryCard
                key={fav.countryCode}
                country={{
                  cca3: fav.countryCode,
                  name: { common: fav.countryName },
                  flags: { png: fav.flag },
                  region: fav.region,
                  capital: [fav.capital],
                  population: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="py-6 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright and Name */}
            <div className="text-sm text-gray-500 mb-4 md:mb-0 font-inter">
              © {new Date().getFullYear()}{" "}
              <span className="font-gloria font-bold">InfoGlobe</span> | Created
              by Janindu Chamod{" "}
              <span className="font-caveat font-bold text-orange-400">
                (SLIIT)
              </span>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {/*Github*/}
              <a
                href="https://github.com/Janinduchamod2001425"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-indigo-600 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/*LinkedIn*/}
              <a
                href="https://linkedin.com/in/janinduchamod"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-indigo-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Portfolio */}
              <a
                href="https://portfolio-janindu.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-indigo-600 transition-colors"
                aria-label="Portfolio"
              >
                <svg
                  className="h-6 w-6 -mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.73 12.79L14.21 9.27c-.78-.78-2.05-.78-2.83 0l-3.54 3.54c-.78.78-.78 2.05 0 2.83l3.53 3.53c.78.78 2.05.78 2.83 0l3.53-3.53c.79-.78.79-2.05 0-2.83zm-5.66 5.65l-3.53-3.53 1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.65 5.65zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                  <path d="M12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FavoritesPage;
