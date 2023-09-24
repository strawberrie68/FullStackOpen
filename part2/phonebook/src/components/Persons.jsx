import personServices from "../services/persons";

const Persons = (props) => {
  const persons = props.persons;

  const confirmDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      props.handleClick(person);
    }
  };

  return (
    <div>
      {persons.map((person) => (
        <p key={person._id}>
          {person.name} {person.number}{" "}
          <button onClick={() => confirmDelete(person)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
