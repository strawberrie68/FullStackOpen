import { useState } from "react";

const PersonForm = (props) => {
  const [newName, setNewName] = useState({
    id: "",
    name: "",
    number: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setNewName((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  const toBeUpdated = (personInfo) => {
    console.log(newName);
    if (
      window.confirm(
        `${newName.name} is already added to phonebook ,replace the old number with a new one?`
      )
    ) {
      try {
        const newInfo = { ...personInfo[0], number: newName.number };
        props.updatePerson(personInfo[0].id, newInfo);
        reset();
      } catch (err) {
        console.log(`${err} can not update person`);
      }
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log(event);

    if (props.persons.find((person) => person.name === newName.name)) {
      toBeUpdated(
        props.persons.filter((person) => person.name === newName.name)
      );
      console.log("there is a duplciate");
    } else {
      try {
        const randomId = Math.floor(Math.random() * 100);
        const newInfo = { ...newName, id: randomId };
        props.handleClick(newInfo);
      } catch (err) {
        console.log(err + "could not add person");
      }
      reset();
    }
  };

  const reset = () => {
    setNewName({
      name: "",
      number: "",
    });
  };

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            type="text"
            name="name"
            value={newName.name}
            onChange={onChange}
          />
        </div>
        <div>
          number:
          <input
            type="text"
            name="number"
            value={newName.number}
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
