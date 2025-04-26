// This file contains functions to interact with the REST API for country data.
const API_BASE_URL = import.meta.env.VITE_API_BASE;

// Check if the API_BASE_URL is defined
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || "Request failed";
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }
  return response.json();
};

// Fetch all countries
export const fetchAllCountries = async () => {
  const response = await fetch(`${API_BASE_URL}/all`);
  return handleResponse(response);
};

// Fetch countries by name
export const searchCountriesByName = async (name) => {
  const response = await fetch(`${API_BASE_URL}/name/${name}`);
  return handleResponse(response);
};

// Fetch countries by Region
export const filterCountriesByRegion = async (region) => {
  const response = await fetch(`${API_BASE_URL}/region/${region}`);
  return handleResponse(response);
};

// Fetch countries by Country Code
export const getCountryDetails = async (code) => {
  const response = await fetch(`${API_BASE_URL}/alpha/${code}`);
  return handleResponse(response);
};
