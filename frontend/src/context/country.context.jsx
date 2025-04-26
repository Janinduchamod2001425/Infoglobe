// country.context.js
import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchAllCountries,
  searchCountriesByName,
  filterCountriesByRegion,
  getCountryDetails,
} from "../services/countries";

const CountryContext = createContext(undefined);

export function CountryProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");

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

  // Function to get country details by code
  const getCountryByCode = async (code) => {
    try {
      setLoading(true);
      return await getCountryDetails(code);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to reset all filters
  const resetAllFilters = () => {
    setSearchTerm("");
    setRegionFilter("all");
  };

  // Function to fetch all countries (refresh)
  const refreshAllCountries = async () => {
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

  return (
    <CountryContext.Provider
      value={{
        countries: filteredCountries,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        regionFilter,
        setRegionFilter,
        getCountryByCode,
        resetAllFilters,
        refreshAllCountries,
        handleSearch: () => filterCountries(), // Added handleSearch
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountries must be used within a CountryProvider");
  }
  return context;
}
