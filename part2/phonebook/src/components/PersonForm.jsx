import { useState } from 'react'

const PersonForm = (props) => {
  const [newName, setNewName] = useState({
    name: '',
    number: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setNewName((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  const toBeUpdated = (personInfo) => {
    console.log(personInfo);
    console.log(`_id: ${personInfo._id}`);

    console.log(newName);
    if (
      window.confirm(
        `${newName.name} is already added to phonebook ,replace the old number with a new one?`
      )
    ) {
      try {
        const newInfo = { ...personInfo, number: newName.number };
        console.log(newInfo);
        props.updatePerson(personInfo._id, newInfo);
        clearForm();
      } catch (err) {
        console.log(`${err} can not update person`);
      }
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log(props.persons);
    const isPerson = props.persons.find(
      (person) => person.name === newName.name
    );

    if (isPerson) {
      console.log('there is a duplciate');
      toBeUpdated(isPerson);
    } else {
      props.handleClick(newName);
      clearForm();
    }
  };

  const clearForm = () => {
    setNewName({
      name: '',
      number: '',
    });
  };

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            type='text'
            name='name'
            value={newName.name}
            onChange={onChange}
          />
        </div>
        <div>
          number:
          <input
            type='text'
            name='number'
            value={newName.number}
            onChange={onChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
