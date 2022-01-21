import React, { useState , useEffect } from 'react'

const CountryShortList = ({ country , stateChanger }) => {
    return <li>{country.name.official} <button onClick={() => stateChanger(country.name.official)}>Show</button></li>
}

export default CountryShortList