import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Notification = ({ message, messageColor }) => {
  if (message === null) {
    return null;
  }
  if (messageColor === "red") {
    return <div className="errorMessage">{message}</div>;
  } else {
    return <div className="message">{message}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addNumber = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        personService.update(id, personObject).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
        });
        setNewName("");
        setNewNumber("");
        setMessage(`Changed ${personObject.name} number`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setMessageColor("red");
          setMessage(JSON.stringify(error.response.data));
          setTimeout(() => {
            setMessage(null);
            setMessageColor(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const removeNumber = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id).then(() => {
        personService.getAll().then((response) => {
          setPersons(response);
        });
      });
      setMessage(`Deleted ${person.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageColor={messageColor} />
      <Filter filter={filter} handler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addNumber}
        newName={newName}
        nameHandler={handleNameChange}
        newNumber={newNumber}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personArray={personsToShow} remove={removeNumber} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.filter} onChange={props.handler} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.newName} onChange={props.nameHandler} />
        </div>
        <div>
          number:{" "}
          <input value={props.newNumber} onChange={props.numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = (props) => {
  return (
    <div>
      <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {props.personArray.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => props.remove(person)}>delete </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
