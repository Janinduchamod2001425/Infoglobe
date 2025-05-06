import { createContext, useContext, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  fetchAllCountries,
  searchCountriesByName,
  filterCountriesByRegion,
  getCountryDetails,
} from "../services/countries";
import {
  getFavorites as getFavoritesService,
  addFavorite as addFavoriteService,
  removeFavorite as removeFavoriteService,
  isFavorite as isFavoriteService,
} from "../services/favourites";

// Creates Context
const CountryContext = createContext(undefined);

// Provides the Context (Provider Component)
export function CountryProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Get current authenticated user
  const getCurrentUser = () => {
    const auth = getAuth();
    return auth.currentUser;
  };

  // Load favorites when user changes
  useEffect(() => {
    const loadFavorites = async () => {
      const user = getCurrentUser();
      if (user) {
        try {
          const favs = await getFavoritesService(user.uid);
          setFavorites(favs);
        } catch (error) {
          console.error("Error loading favorites:", error);
        }
      }
    };
    loadFavorites();
  }, []);

  // Fetch all countries on initial load
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  // Filter countries based on search term and region filter
  useEffect(() => {
    const filterCountries = async () => {
      try {
        setLoading(true);
        let result;

        if (searchTerm) {
          result = await searchCountriesByName(searchTerm);
        } else if (regionFilter && regionFilter !== "all") {
          result = await filterCountriesByRegion(regionFilter);
        } else {
          result = countries;
        }

        setFilteredCountries(result || []);
      } catch (err) {
        setError(err.message);
        setFilteredCountries([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      filterCountries();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, regionFilter, countries]);

  // Toggle favorite status for a country
  const toggleFavorite = async (country) => {
    const user = getCurrentUser();
    if (!user) {
      throw new Error("You need to be logged in to save favorites");
    }

    const countryCode = country.cca3;
    const isFav = await isFavoriteService(user.uid, countryCode);

    try {
      if (isFav) {
        await removeFavoriteService(user.uid, countryCode);
        setFavorites(favorites.filter((f) => f.countryCode !== countryCode));
      } else {
        const countryData = {
          countryName: country.name.common,
          flag: country.flags.png,
          region: country.region,
          capital: country.capital?.[0] || "N/A",
          userId: user.uid,
        };
        await addFavoriteService(user.uid, countryCode, countryData);
        setFavorites([...favorites, { countryCode, ...countryData }]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  };

  // Check if a country is favorite by current user
  const checkIsFavorite = async (countryCode) => {
    const user = getCurrentUser();
    if (!user) return false;
    return await isFavoriteService(user.uid, countryCode);
  };

  return (
    <CountryContext.Provider
      value={{
        countries: showFavorites
          ? countries.filter((c) =>
              favorites.some((f) => f.countryCode === c.cca3),
            )
          : filteredCountries,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        regionFilter,
        setRegionFilter,
        getCountryByCode: async (code) => {
          try {
            setLoading(true);
            return await getCountryDetails(code);
          } catch (err) {
            setError(err.message);
            return null;
          } finally {
            setLoading(false);
          }
        },
        resetAllFilters: () => {
          setSearchTerm("");
          setRegionFilter("all");
        },
        refreshAllCountries: async () => {
          try {
            setLoading(true);
            const data = await fetchAllCountries();
            setCountries(data);
            setFilteredCountries(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        favorites,
        toggleFavorite,
        isFavorite: checkIsFavorite,
        showFavorites,
        toggleShowFavorites: () => setShowFavorites(!showFavorites),
        getFavorites: async (userId) => {
          try {
            return await getFavoritesService(userId);
          } catch (error) {
            console.error("Error loading favorites:", error);
            return [];
          }
        },
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

// Custom Hook to consume the Context
export function useCountries() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountries must be used within a CountryProvider");
  }
  return context;
}
