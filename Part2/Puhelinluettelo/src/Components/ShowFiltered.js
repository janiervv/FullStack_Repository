import React from 'react'
import Controller from './Controller'
import PersonForm from './PersonForm'

const ShowFiltered = (props) => {

    const filtered = props.persons.filter(item => {
        return item.name.toLowerCase().includes(props.searchWord.toLowerCase());
      });

  const showNotification = (person) =>  {
        props.setNotification("Success! " + person + " was deleted")
        setTimeout(() => {
          props.setNotification("")
        }, 4000)
      }
      
const removeUser = (note_id, name) => {
    if (window.confirm("Remove " + name + "?")) { 
    try {
    Controller.delete_user(note_id)
    .then (
        Controller
        .getAll()
          .then(initialNotes => {
            props.setPersons(initialNotes.filter(person => person.id !== note_id))
            showNotification(name)
          }
        )
    )
} catch (err) {
    console.log(err)
    }
  }
}
    
return (

    filtered.map(name => <ul key = {name.name}>{name.name}, number {name.number}
    <button onClick={() => removeUser(name.id, name.name)}
    >Delete</button>
    </ul>)
    
)
}

export default ShowFiltered;


