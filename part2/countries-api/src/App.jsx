import { useEffect, useState } from "react";
import APICountryCall from "./service/countries";
import "./App.css";
import CountryInfo from "./components/countryInfo";

function App() {
  const [data, setData] = useState([]);
  const [word, setWord] = useState("");
  const [list, setList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    APICountryCall.getAll()
      .then((response) => {
        console.log("data retrived");
        setData(response.map((country) => country.name.official));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  const onChange = (event) => {
    const { value } = event.target;
    setWord(value);
  };

  useEffect(() => {
    const regexp = new RegExp(word, "i");
    const filterName = data.filter((country) => regexp.test(country));
    setList(filterName);
  }, [word]);

  console.log(list);

  useEffect(() => {
    if (list.length === 1) {
      APICountryCall.getCountry(list[0])
        .then((response) => {
          setSelectedCountry(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [list]);

  console.log(selectedCountry);

  const [toggleShow, setToggleShow] = useState(false);
  console.log(toggleShow);

  const showCountry = (countryName) => {
    console.log(countryName);
    setToggleShow((prev) => !prev);
    APICountryCall.getCountry(countryName)
      .then((response) => {
        setSelectedCountry(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <p>find countries</p>
        <input type="text" value={word} onChange={onChange} />
      </div>
      <div>
        {list.length <= 10 && list.length > 1 ? (
          <div>
            {list.map((country, i) => (
              <p id={country} key={i}>
                {country}{" "}
                <button
                  id={country}
                  onClick={(event) => showCountry(event.target.id)}
                >
                  show
                </button>
              </p>
            ))}
          </div>
        ) : (
          list.length > 10
        )}
        {selectedCountry && toggleShow && (
          <CountryInfo selectedCountry={selectedCountry} />
        )}
        {selectedCountry && toggleShow === false && list.length === 1 && (
          <CountryInfo selectedCountry={selectedCountry} />
        )}
      </div>
    </div>
  );
}

export default App;
