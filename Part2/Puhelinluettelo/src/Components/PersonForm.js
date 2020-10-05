import React from 'react'
import Controller from './Controller'


const PersonsFrom = (props) => {

    const addPersonToState = (event) => {
    props.setNewName((event.target.value))
    }

    const addNumberToState = (event) => {
    props.setNewNumber((event.target.value))
    }

    const showNotification = (person) =>  {
      props.setNotification("Success! Name: " + person.name + ", number: " + person.number)
      setTimeout(() => {
        props.setNotification("")
      }, 4000)
    }

    const showError = (person) =>  {
      props.setErrormessage("Whoops! " + person.name + " was already deleted.")
      setTimeout(() => {
        props.setErrormessage("")
      }, 4000)
    }

    const changeNumber = async (name, number) => {
      const person = props.persons.find(person => person.name === name)
      const id = person.id
      const changedPerson = { ...person, number: number}
      
      try {
      await Controller.update(id, changedPerson)
      await Controller.getAll()
        .then(initialNotes => {
          props.setPersons(initialNotes)
          showNotification(changedPerson)
      })
    } catch (err) {
      console.log(err)
      showError(changedPerson)
    }
    }

    const addPerson = (event) => {
    event.preventDefault()
    const userExists = props.persons.findIndex(name => name.name === props.newName)
    const numberExists = props.persons.findIndex(number => number.number === props.newNumber)


    if (userExists === -1 && numberExists === -1) {
    
      const newPerson = {
        name: props.newName,
        number: props.newNumber,
      }
    
      Controller
      .create(newPerson)
        .then(initialNotes => {
          props.setPersons(props.persons.concat(initialNotes))
          props.setNewName('')
          props.setNewNumber('')
            showNotification(initialNotes)
        })
  

    } else if (numberExists !== -1) {
    props.setNewName('')
    props.setNewNumber('')
    alert(`${props.newNumber} is already added to phonebook`)

    } else if (userExists !== -1) {
      if (window.confirm("Do you want to change number for " + props.newName + "?")) { 
      changeNumber(props.newName, props.newNumber)
      }
    }

    }

return (

<form onSubmit={addPerson}>
<div>
  name: <input 
  value={props.newName}
  onChange={addPersonToState} 
  />
</div>
<div>
  number: <input 
  value={props.newNumber}
  onChange={addNumberToState} 
  />
</div>
<div>
  <button type="submit">add</button>
</div>
</form>
)

}

export default PersonsFrom;