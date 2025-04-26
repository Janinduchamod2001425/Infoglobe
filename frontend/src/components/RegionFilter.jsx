import { useCountries } from "../context/country.context.jsx";

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionFilter() {
  const { regionFilter, setRegionFilter } = useCountries();

  return (
    <select
      value={regionFilter}
      onChange={(e) => setRegionFilter(e.target.value.toLowerCase())}
      className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {regions.map((region) => (
        <option key={region} value={region.toLowerCase()}>
          {region === "All" ? "Filter by Region" : region}
        </option>
      ))}
    </select>
  );
}
