import React from 'react'

const Filter = ({ filterName,handleChange }) => {
  return(
  <div>
  Filter shown whit a:<input value={filterName} onChange={handleChange} />
  </div>
  )}

export default Filter