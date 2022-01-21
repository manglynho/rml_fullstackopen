import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons' 
import Notification from './components/Notification'

const App = () => {
  
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filterName, setFilterName] = useState('');
  const [ notif, setNotif ] = useState([])
  
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)})
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    
    const exists = persons.filter(p => p.name == newName)
    
    if(exists.length > 0){
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one ?`)) {
          console.log(exists[0].name)
          const changedPerson = { ...exists[0], number: newPhone }
          personsService
            .update(exists[0].id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== exists[0].id ? person : returnedPerson))
              setNewName('')
              setNewPhone('')
              triggerNotif(`Updated number for ${newName}`, 'success')
            })
            .catch( error => {
              triggerNotif(`Person ${newName} was already removed from server`, 'error')
              setPersons(persons.filter(n => n.id !== exists[0].id))
            }) 
          return
      }
    }

    const personObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {        
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewPhone('')
      triggerNotif(`Added ${newName}`, 'success')
      })
  }

  const triggerNotif = ( message, style) => {
    const notif = {
      message: message,
      style: style,
    }
    setNotif(notif)
    setTimeout(() => {setNotif([])}, 3000)
  }

  const removePerson = (personObject) => {
    if (window.confirm(`Delete ${personObject.name} ?`)) {
      personsService
        .remove(personObject.id)
        .then(() =>{
          setPersons(persons.filter(n => n.id !== personObject.id))
          triggerNotif(`Removed ${personObject.name}`, 'success') 
          }    
        )
        .catch( error => {
          triggerNotif(`Person ${personObject.name} was already removed from server`, 'error')
          setPersons(persons.filter(n => n.id !== personObject.id))   
        }) 
    }
  }

  const handleNameChange = (event) => {    
    setNewName(event.target.value)  
  }
  const handlePhoneChange = (event) => {    
    setNewPhone(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notif}/>
      <Filter filterName={filterName} handleChange={event => setFilterName(event.target.value)}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleSubmit={addPerson}/>
      <h2>Numbers</h2>
      <ul>
      {persons.filter(f => f.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '').map(person => (
            <Persons key={person.id} person={person} removePerson={() => removePerson(person)} />
      ))}
      </ul>
    </div>
  )
}

export default App