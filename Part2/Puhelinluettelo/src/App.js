import React, { useState, useEffect  } from 'react'
import PersonsForm from './Components/PersonForm'
import ShowFiltered from './Components/ShowFiltered'
import Filter from './Components/Filter'
import Controller from './Components/Controller'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ errormessage, setErrormessage ] = useState('')


useEffect(() => {
  Controller
  .getAll()
    .then(initialNotes => {
      setPersons(initialNotes)
  })
}, [])

  return (

    <div>

      <h2 className="notification">{notification}</h2>
      <h2 className="error">{errormessage}</h2>

      <h2>Phonebook</h2>

      <Filter searchWord={searchWord} setSearchWord={setSearchWord}></Filter>

      <h2>Add a new person</h2>

      <PersonsForm newName={newName} setNewName={setNewName} 
      newNumber={newNumber} setNewNumber={setNewNumber} 
      persons={persons} setPersons={setPersons} 
      notification={notification} setNotification={setNotification}
      errormessage={errormessage} setErrormessage={setErrormessage}/>

      <h2>Numbers</h2>

      <ShowFiltered persons={persons} 
      searchWord={searchWord} setPersons={setPersons} 
      notification={notification} setNotification={setNotification}
      ></ShowFiltered>

    </div>
  )
}

export default App
