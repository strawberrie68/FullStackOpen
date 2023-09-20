import Weather from "./Weather";

const CountryInfo = ({ selectedCountry }) => {
  console.log(selectedCountry);
  const languages = Object.values(selectedCountry.languages);

  return (
    <div>
      <div>
        <h2>{selectedCountry?.name.official}</h2>
        <p>Capital {selectedCountry?.capital[0]}</p>
        <p>Area {selectedCountry?.area}</p>
      </div>
      <div className="language-container">
        <h4>languages:</h4>
        <div className="list-container">
          <ul>
            {languages &&
              languages.map((language, i) => <li key={i}>{language}</li>)}
          </ul>
        </div>
      </div>
      <div className="flag">
        <img src={selectedCountry.flags.svg} />
      </div>
      <h2>Weather in {selectedCountry?.capital[0]}</h2>
      <Weather countryGeo={selectedCountry?.latlng} />
    </div>
  );
};

export default CountryInfo;
