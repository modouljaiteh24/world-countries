import { useEffect, useState } from "react";
import "./App.css";
import LoaderComponent from "./LoaderComponent";

function App() {
  const [country, setCountry] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [theme, setTheme] = useState(true);

  const filterRegion = [
    "Filter by Region",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania", // ✅ Fixed spelling
  ];

  // Theme toggle
  const handleToggleTheme = () => {
    const body = document.getElementsByTagName("body")[0];
    if (theme) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
    setTheme(!theme);
  };

  // Fetch countries on load
  const fetchCountry = async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags"
    );
    const data = await response.json();
    setCountry(data);
    setIsloading(false);
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  // Handle search input
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle region filter
  const handleRegionToggle = (event) => {
    setSelectedRegion(event.target.value);
  };

  // Combined filtering logic
  const filteredCountries = country.filter((c) => {
    const matchesSearch = c.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === "" ||
      c.region.toLowerCase() === selectedRegion.toLowerCase();

    return matchesSearch && matchesRegion;
  });

  return (
    <>
      <header>
        <div className="header-container">
          <h1 className=" font-bold">Where in the world?</h1>

          <div onClick={handleToggleTheme}>
            <span className="dark-mode-toggler">
              {theme ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </span>
          </div>
        </div>
      </header>

      <main>
        <div className="filters">
          <form>
            {/* Search Input */}
            <div className="input-wrapper">
              <svg
                style={{ width: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="search-icon"
              >
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
                  fill="currentColor"
                />
              </svg>
              <input
                className="search-input"
                value={searchTerm}
                onChange={handleSearchInput}
                type="text"
                placeholder="Search for a country..."
              />
            </div>

            {/* Region Filter Dropdown */}
            <div className="select-wrapper">
              <select onChange={handleRegionToggle} className="select-input">
                {filterRegion.map((region, index) => (
                  <option
                    key={index}
                    value={region === "Filter by Region" ? "" : region}
                    // disabled={region === "Filter by Region"}
                    // hidden={region === "Filter by Region"}
                  >
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* Country Cards */}
        <div className="countries">
          {isloading ? (
            <LoaderComponent />
          ) : filteredCountries.length === 0 ? (
            <p>No countries match your search.</p>
          ) : (
            filteredCountries.map((country) => (
              <div className="country-card" key={country.name.common}>
                <div className="card-header">
                  <img
                    className="flag"
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                  />
                </div>
                <div className="card-body">
                  <h2>{country.name.common}</h2>
                  <ul className="country-info">
                    <li className="country-info-content-wrapper">
                      <strong>Population:</strong>{" "}
                      <span>{country.population.toLocaleString()}</span>
                    </li>
                    <li className="country-info-content-wrapper">
                      <strong>Region:</strong> <span>{country.region}</span>
                    </li>
                    <li className="country-info-content-wrapper">
                      <strong>Capital:</strong>{" "}
                      <span>
                        {country.capital ? country.capital[0] : "N/A"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default App;
