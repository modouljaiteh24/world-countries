import { useEffect, useState } from "react";
import "./App.css";

// const country = {
//   name: {
//     common: "Gambia",
//     official: "Republic of the Gambia",
//     nativeName: {
//       eng: { official: "Republic of the Gambia", common: "Gambia" },
//     },
//   },
//   tld: [".gm"],
//   cca2: "GM",
//   ccn3: "270",
//   cca3: "GMB",
//   cioc: "GAM",
//   independent: true,
//   status: "officially-assigned",
//   unMember: true,
//   currencies: { GMD: { name: "dalasi", symbol: "D" } },
//   idd: { root: "+2", suffixes: ["20"] },
//   capital: ["Banjul"],
//   altSpellings: ["GM", "Republic of the Gambia"],
//   region: "Africa",
//   subregion: "Western Africa",
//   languages: { eng: "English" },
//   translations: {
//     ara: { official: "جمهورية غامبيا", common: "غامبيا" },
//     bre: { official: "Republik islamek ar Gambia", common: "Gambia" },
//     ces: { official: "Gambijská republika", common: "Gambie" },
//     cym: { official: "Republic of the Gambia", common: "Gambia" },
//     deu: { official: "Republik Gambia", common: "Gambia" },
//     est: { official: "Gambia Vabariik", common: "Gambia" },
//     fin: { official: "Gambian tasavalta", common: "Gambia" },
//     fra: { official: "République de Gambie", common: "Gambie" },
//     hrv: { official: "Republika Gambija", common: "Gambija" },
//     hun: { official: "Gambiai Köztársaság", common: "Gambia" },
//     ita: { official: "Repubblica del Gambia", common: "Gambia" },
//     jpn: { official: "ガンビア共和国", common: "ガンビア" },
//     kor: { official: "감비아 공화국", common: "감비아" },
//     nld: { official: "Republiek Gambia", common: "Gambia" },
//     per: { official: "جمهوری گامبیا", common: "گامبیا" },
//     pol: { official: "Republika Gambii", common: "Gambia" },
//     por: { official: "República da Gâmbia", common: "Gâmbia" },
//     rus: { official: "Республика Гамбия", common: "Гамбия" },
//     slk: { official: "Gambijská republika", common: "Gambia" },
//     spa: { official: "República de Gambia", common: "Gambia" },
//     srp: { official: "Република Гамбија", common: "Гамбија" },
//     swe: { official: "Republiken Gambia", common: "Gambia" },
//     tur: { official: "Gambiya Cumhuriyeti", common: "Gambiya" },
//     urd: { official: "جمہوریہ گیمبیا", common: "گیمبیا" },
//     zho: { official: "冈比亚共和国", common: "冈比亚" },
//   },
//   latlng: [13.46666666, -16.56666666],
//   landlocked: false,
//   borders: ["SEN"],
//   area: 10689.0,
//   demonyms: {
//     eng: { f: "Gambian", m: "Gambian" },
//     fra: { f: "Gambienne", m: "Gambien" },
//   },
//   flag: "\uD83C\uDDEC\uD83C\uDDF2",
//   maps: {
//     googleMaps: "https://goo.gl/maps/bbGBCxxtfD2A9Z4m6",
//     openStreetMaps: "https://www.openstreetmap.org/relation/192774",
//   },
//   population: 2416664,
//   gini: { 2015: 35.9 },
//   fifa: "GAM",
//   car: { signs: ["WAG"], side: "right" },
//   timezones: ["UTC+00:00"],
//   continents: ["Africa"],
//   flags: {
//     png: "https://flagcdn.com/w320/gm.png",
//     svg: "https://flagcdn.com/gm.svg",
//     alt: "The flag of Gambia is composed of three equal horizontal bands of red, blue with white top and bottom edges, and green.",
//   },
//   coatOfArms: {
//     png: "https://mainfacts.com/media/images/coats_of_arms/gm.png",
//     svg: "https://mainfacts.com/media/images/coats_of_arms/gm.svg",
//   },
//   startOfWeek: "monday",
//   capitalInfo: { latlng: [13.45, -16.57] },
// };
function App() {
  const [country, setCountry] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(true);
  const [regionInput, setRegionInput] = useState("");

  const filterRegion = [
    "Filter by Region",
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oseania",
  ];

  const handleToggleTheme = () => {
    if (theme) {
      const toggleEL = document.getElementsByTagName("body")[0];
      toggleEL.classList.toggle("dark");
      console.log(toggleEL);
      setTheme(false);
    } else {
      const toggleEL = document.getElementsByTagName("body")[0];
      toggleEL.classList.remove("dark");
      setTheme(true);
    }
  };

  const fetchCountry = async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,region"
    );
    const data = await response.json();
    setCountry(data);
    setIsloading(false);
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleSearchInput = (event) => {
    const searchInput = event.target.value;
    setSearchTerm(searchInput);
  };

  // const filterContry = country.filter((c) => {
  //   if (searchTerm == "") return c;
  //   return c.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   // return c.name.searchTerm;
  // });

  const filterContry = country.filter((c) => {
    if (searchTerm === "") return true;
    return c.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // const handleRegionToggle = (event) => {
  //   const selectedRegion = event.target.value;

  //   setIsloading(event.target.value);
  //   setIsloading(false);

  //   const regioncountries = country.filter((c) => {
  //     c.region.toLowerCase() === selectedRegion.toLowerCase();
  //   });
  //   setRegionInput(regioncountries);
  // };

  // const handleRegionToggle = (event) => {
  //   const selectedRegion = event.target.value;

  //   const regionCountries = country.filter(
  //     (c) => c.region.toLowerCase() === selectedRegion.toLowerCase()
  //   );

  //   setRegionInput(regionCountries);
  // };

  const handleRegionToggle = (event) => {
    const selectedRegion = event.target.value;

    setIsloading(true);

    const regionCountries = country.filter((c) => {
      return (
        selectedRegion === "" ||
        c.region?.toLowerCase() === selectedRegion.toLowerCase()
      );
    });

    setRegionInput(regionCountries);
    setIsloading(false);
  };

  return (
    <>
      <header>
        <div>
          <h1>Where in the world?</h1>

          <div onClick={handleToggleTheme}>
            <span className="dark-mode-toggler">
              {theme ? "White Mode" : "Dark Mode"}
            </span>
          </div>
        </div>
      </header>
      <main>
        <div className="filters">
          <form action="">
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

            <div className="select-wrapper">
              {/* <select
                onClick={handleRegionToggle}
                className="select-input"
                name="region"
                id="region"
              >
                {filterRegion.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select> */}
              <select onChange={handleRegionToggle}>
                {filterRegion.map((region, index) => (
                  <option
                    key={index}
                    value={region === "Filter by Region" ? "" : region}
                    disabled={region === "Filter by Region"}
                    hidden={region === "Filter by Region"}
                  >
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <div className="countries">
          {isloading && <span className="text-2xl">Loading....</span>}

          {filterContry.map((country) => (
            <div className="country-card" key={country.name.common}>
              <div className="card-header">
                <img
                  className="flag"
                  src={country.flags.png}
                  alt="The Gambia Flag"
                />
              </div>
              <div className="card-body">
                <h2>{country.name.common}</h2>
                <ul className="country-info">
                  <li className="contry-info-content-wrapper">
                    <strong className="country-info-label">Population:</strong>{" "}
                    <span>{country.population.toLocaleString()}</span>
                  </li>
                  <li className="contry-info-content-wrapper">
                    <strong className="country-info-label">Region:</strong>{" "}
                    <span>{country.region}</span>
                  </li>
                  <li className="contry-info-content-wrapper">
                    <strong className="country-info-label">Capital: </strong>
                    <span>{country.capital ? country.capital[0] : "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
