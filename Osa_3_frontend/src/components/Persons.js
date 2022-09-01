import React from "react";

const Persons = (props) => (
  <div>
    {props.peopleToShow.map((person) => {
      return (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => props.removePerson(person.id)}>delete</button>
        </div>
      );
    })}
  </div>
);

export default Persons;
