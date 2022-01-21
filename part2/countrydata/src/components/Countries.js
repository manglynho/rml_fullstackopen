import React, { useState , useEffect } from 'react'
import CountryView from '../components/CountryView'
import CountryShortList from '../components/CountryShortList'

const Countries = ({ stateChanger, filtered }) => {
    if (filtered.length > 1 && filtered.length <= 10){
      return(
        <ul>
          { 
            filtered.map( (country, index) => (
              <CountryShortList key={index} country={country} stateChanger={stateChanger}/>
            ))
          }
        </ul>
        )
    }else if( filtered.length === 1 ){
      return(
        <div>
        { 
          filtered.map((country, index) => (
            <CountryView key={index} country={country} />
          ))
        }
      </div>
      )
    }else{
      return(<div>To many data. Specify some filter</div>)
    }
}

export default Countries