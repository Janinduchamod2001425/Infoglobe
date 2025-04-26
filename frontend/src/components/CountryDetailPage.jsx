import { useParams } from "react-router-dom";
import { useCountries } from "../context/country.context";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import bgImage from "../assets/desktop.svg";

const CountryDetailPage = () => {
  const { code } = useParams();
  const { getCountryByCode } = useCountries();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch country data by code
  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        if (!data?.[0]) {
          console.log("Country not found");
        } else {
          setCountry(data[0]);
        }
      } catch (err) {
        console.log("Error fetching country data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCountry();
  }, [code, getCountryByCode]);

  // Handle loading state
  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Handle case when country is not found
  if (!country) {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 max-w-md text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Country not found
          </h2>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Render country details
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/40 min-h-screen backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center sm:px-6 sm:py-3 px-4 py-1 bg-white/90 hover:bg-white text-gray-800 font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <FiArrowLeft className="mr-2" />
              Back
            </Link>
          </div>

          {/* Country Card */}
          <div className="bg-white/70 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Flag Section */}
              <div className="p-8 flex items-center justify-center ">
                <img
                  src={country.flags?.svg || country.flags?.png}
                  alt={`Flag of ${country.name?.common}`}
                  className="w-full max-h-96 object-contain rounded-lg shadow-sm"
                  loading="lazy"
                />
              </div>

              {/* Details Section */}
              <div className="p-8 md:p-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 font-comfort">
                  {country.name?.common}
                </h1>

                {/*Main Details*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Native Name:
                      </span>{" "}
                      {Object.values(country.name?.nativeName || {})[0]
                        ?.common || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Population:
                      </span>{" "}
                      {country.population?.toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Region:
                      </span>{" "}
                      {country.region}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Sub Region:
                      </span>{" "}
                      {country.subregion || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Capital:
                      </span>{" "}
                      {country.capital?.[0] || "N/A"}
                    </p>
                  </div>

                  {/*Sub Details*/}
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Domain:
                      </span>{" "}
                      {country.tld?.join(", ") || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Currencies:
                      </span>{" "}
                      {country.currencies
                        ? Object.values(country.currencies)
                            .map((c) => c.name)
                            .join(", ")
                        : "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Languages:
                      </span>{" "}
                      {country.languages
                        ? Object.values(country.languages).join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Border Countries */}
                {country.borders && country.borders.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                      Border Countries:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {country.borders.map((border) => (
                        <Link
                          key={border}
                          to={`/country/${border}`}
                          className="px-4 py-2 bg-violet-300  border border-gray-200 rounded-3xl shadow-lg hover:bg-gray-50 transition-all duration-200"
                        >
                          {border}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailPage;
