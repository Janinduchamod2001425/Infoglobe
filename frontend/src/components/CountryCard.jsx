import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCountries } from "../context/country.context";
import { useState, useEffect } from "react";

const CountryCard = ({ country }) => {
  const { toggleFavorite, isFavorite } = useCountries();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favStatus = await isFavorite(country.cca3);
      setIsFav(favStatus);
    };
    checkFavorite();
  }, [country.cca3, isFavorite]);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleFavorite(country);
      setIsFav(!isFav);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return (
      <Link
          to={`/country/${country.cca3}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
      >
        <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full z-10 hover:bg-pink-100 transition-colors"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? (
              <FaHeart className="text-pink-500" />
          ) : (
              <FaRegHeart className="text-gray-400 hover:text-pink-500" />
          )}
        </button>

        <div className="h-48 overflow-hidden">
          <img
              src={country.flags?.png}
              alt={`Flag of ${country.name?.common}`}
              className="w-full h-full object-cover"
              loading="lazy"
          />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 font-comfort">
            {country.name?.common}
          </h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold text-indigo-700">Population:</span>{" "}
              {country.population?.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-red-700">Region:</span>{" "}
              {country.region}
            </p>
            <p>
              <span className="font-semibold text-green-600">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
          </div>
        </div>
      </Link>
  );
};

export default CountryCard;