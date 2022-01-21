import React from 'react'

const PersonForm = props => {
    return (
      <form onSubmit={props.handleSubmit}>
      <div>
          Name:<input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
          Number:<input value={props.newPhone} onChange={props.handlePhoneChange} />
          </div>
          <button type="submit">save</button>
      </form>
    )
  }

export default PersonForm