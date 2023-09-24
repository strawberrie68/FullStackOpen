import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personServices from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successfulMessage, setSuccessfulMessage] = useState(null);

  const addTo = (newName) => {
    personServices
      .create({ name: newName.name, number: newName.number })
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        console.log("person added");
      })
      .then(() => {
        reset("successful", "added", newName.name);
      })
      .catch((error) => {
        reset("unsuccessful", error.response.data.error, newName.name);
        console.log(error.response.data.error);
      });
  };

  useEffect(() => {
    personServices.getAll().then((intialPeople) => {
      setPersons(intialPeople);
    });
  }, []);

  const removeClicked = (person) => {
    console.log(`button is clicked ${person.name}`);
    personServices
      .removePerson(person._id)
      .then(() => {
        setPersons(persons.filter((n) => n._id !== person._id));
        reset("successful", "removed", person.name);
      })
      .catch(() => {
        reset("unsuccessful", "removed", person.name);
      });
  };

  const updatePerson = (idObject, newInfo) => {
    console.log(idObject.id);
    const id = idObject;

    personServices
      .update(id, newInfo)
      .then((response) => {
        console.log(persons);
        setPersons(persons.map((p) => (p.id !== id ? p : response.data)));
      })
      .then(() => {
        reset("successful", "updated", newInfo.name);
      })
      .catch((error) => {
        console.log(error);
        reset("unsuccessful", error.response.data.error, newInfo.name);
        console.log(error.response.data.error);
      });
  };

  const reset = (status, action, name) => {
    if (status === "successful") {
      setSuccessfulMessage(`'${name}' has been ${action}`);
      setTimeout(() => {
        setSuccessfulMessage(null);
      }, 5000);
    } else {
      setErrorMessage(`${action} `);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />

      <Notification
        errorMessage={errorMessage}
        successfulMessage={successfulMessage}
      />

      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        handleClick={addTo}
        updatePerson={(id, newInfo) => updatePerson(id, newInfo)}
      />
      <h2>Numbers</h2>
      <div>
        <Persons
          persons={persons}
          handleClick={(person) => removeClicked(person)}
        />
      </div>
    </div>
  );
};

export default App;
