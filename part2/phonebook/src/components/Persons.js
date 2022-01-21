import React from 'react'

const Persons = ({ person, removePerson }) => {
    return <li>
      {person.name} {person.number} 
      <button onClick={removePerson}>Remove</button>
      </li>
  }

export default Persons