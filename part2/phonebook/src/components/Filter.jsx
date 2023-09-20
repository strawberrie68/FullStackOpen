import { useState, useEffect } from "react";

const Filter = ({ persons }) => {
  const [findName, setFindName] = useState("");
  const [filtered, setFiltered] = useState();

  const inputName = (event) => {
    const { value } = event.target;
    setFindName(value);
  };

  useEffect(() => {
    const regexp = new RegExp(findName, "i");
    const filterName = persons.filter((person) => regexp.test(person.name));
    setFiltered(filterName);
  }, [findName]);

  return (
    <div>
      <p>filter shown with</p>
      <input type="text" name="filter" value={findName} onChange={inputName} />
      {findName !== "" &&
        filtered.map((person) => (
          <p>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default Filter;
