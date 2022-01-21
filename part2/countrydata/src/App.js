import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  
  const [ countries, setCountry ] = useState([]) 
  const [ filterName, setFilterName] = useState('')
  
  const countryHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountry(response.data)
      })
  }

  useEffect(countryHook, [])

  const filtered = countries.filter( f => f.name.official.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Country Data</h2>
      <Filter filterName={filterName} handleChange={event => setFilterName(event.target.value)}/>
      <Countries stateChanger={setFilterName} filtered={filtered}/>
      </div>
  )
}

export default App