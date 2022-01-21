import React, { useState , useEffect } from 'react'
import axios from 'axios'

const CountryView = ({ country }) => {
  
  const [ weather, setWeather ] = useState([]) 

  const params = { 
    access_key: process.env.REACT_APP_API_KEY ,
    query: { toJSON: () => country.capital } , 
  }
  
    const countryWeatherHook = () => {
      axios
        .get('http://api.weatherstack.com/current',
          { params }
        )
        .then(response => {
          setWeather(response.data)
        })
    }
    
    useEffect(countryWeatherHook, [])
    
    let langs = Object.values(country.languages)
  
    if (!weather.current) return null
    
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languagues</h3>{
          langs.map((lang, index) => (
            <p key={index}>{lang}</p>
          ))
          }
          <img src={country.flags.png} />
          <h3>Wheather in {country.capital} </h3> 
          <p>Temperature {weather.current.temperature} Celcius</p>
          <img src={weather.current.weather_icons}/>
          <p>Wind {weather.current.wind_speed} Mph - Direction {weather.current.wind_dir} </p>
      </div>
      )
  
}
export default CountryView