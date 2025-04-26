// src/components/CountryCard.jsx
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Flag Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={country.flags?.png}
          alt={`Flag of ${country.name?.common}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Country Details */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-4 font-comfort">
          {country.name?.common}
        </h3>

        {/* Population, Region, and Capital */}
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
