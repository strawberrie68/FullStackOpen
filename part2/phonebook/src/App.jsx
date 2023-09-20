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
      .create(newName)
      .then(() => {
        setPersons(persons.concat(newName));
        console.log("person added");
      })
      .then(() => {
        reset("successful", "added", newName.name);
      })
      .catch((error) => {
        reset("unsuccessful", "added", newName.name);
      });
  };
  console.log(errorMessage);
  console.log(persons);

  useEffect(() => {
    personServices.getAll().then((intialPeople) => {
      setPersons(intialPeople);
    });
  }, []);

  const removeClicked = (person) => {
    console.log(`button is clicked ${person.id}`);
    personServices
      .removePerson(person.id)
      .then(() => {
        console.log("removed button clicked");
        setPersons(persons.filter((n) => n.id !== person.id));
        reset("successful", "removed", person.name);
      })
      .catch((error) => {
        reset("unsuccessful", "removed", person.name);
      });
  };
  const fetchData = () => {
    personServices.getAll().then((intialPeople) => {
      setPersons(intialPeople);
    });
  };

  const updatePerson = (id, newInfo) => {
    personServices
      .update(id, newInfo)
      .then(() => {
        fetchData();
      })
      .then(() => {
        reset("successful", "updated", newInfo);
      })
      .catch((error) => {
        console.log(error);
        reset("unsuccessful", "removed", newInfo.name);
      });
  };

  const reset = (status, action, name) => {
    if (status === "successful") {
      setSuccessfulMessage(`'${name}' has been ${action}`);
      setTimeout(() => {
        setSuccessfulMessage(null);
      }, 5000);
    } else {
      setErrorMessage(`'${name}' was already ${action} from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
