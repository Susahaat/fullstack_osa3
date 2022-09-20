import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons2";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((personList) => {
      setPersons(personList);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (names.includes(newName)) {
      const accept = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (accept) {
        const updatePerson = persons.find((person) => person.name === newName);
        personService.update(updatePerson.id, personObject);
        setConfirmationMessage("Person updated");
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
      } else {
        setConfirmationMessage("Did not update.");
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
      }
    } else {
      setNewName("");
      setNewNumber("");
      personService
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setConfirmationMessage(`${newName} added`);
          setTimeout(() => {
            setConfirmationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const removePerson = (person) => {
    const accept = window.confirm(`Do you want to delete this person?`);
    if (accept) {
      personService.remove(person);
      const index = persons.indexOf(person);
      persons.splice(index, 1);
      setPersons(persons);
      setConfirmationMessage(`Person deleted.`);
      setTimeout(() => {
        setConfirmationMessage(null);
      }, 5000);
    }
  };

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  const OkNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="confirmation">{message}</div>;
  };

  const peopleToShow = persons.filter((people) => {
    return people.name.toLowerCase().includes(newFilter.toLowerCase());
  });

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <OkNotification message={confirmationMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
