import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)




const Showanecdotes = (props) => {

  if (props.pointscounter[props.selected] !== 1) {
  return (
    <div>

      <h1>Anecdote of the day</h1>

      <p>{props.anecdotes[props.selected]}</p> 
      <p>Has {props.pointscounter[props.selected]} points.</p>

    </div>
)

// if only 1 point, say "point" insted of "points"
} else {
  return (
    <div>

      <h1>Anecdote of the day</h1>

      <p>{props.anecdotes[props.selected]}</p> 
      <p>Has {props.pointscounter[props.selected]} point.</p>

    </div>
)
}
}

const Mostvotes = (props) => {

  const maxvotes = Math.max(...props.pointscounter)
  const positionofmaxvotes = props.pointscounter.indexOf(Math.max(...props.pointscounter));
  const anecdotewithmostvotes = props.anecdotes[positionofmaxvotes]

  if (maxvotes > 1) {

  return (
    <div>
    <h1>Anecdote with most votes</h1>

    <p>Anecdote with the most votes has {maxvotes} votes. This anecdote is:</p>

    <p style={{fontWeight: "bold"}}>{anecdotewithmostvotes}</p>
    </div>
  )

// if only 1 point, say "point" insted of "points"

} else if (maxvotes === 1) {
  return (
    <div>
    <h1>Anecdote with most votes</h1>

    <p>Anecdote with the most votes has {maxvotes } vote. This anecdote is:</p>

    <p style={{fontWeight: "bold"}}>{anecdotewithmostvotes}</p>
    </div>
  )
}

// if no points have been give, do not show anecdotes

  else if (maxvotes  === 0) {
  return (
    <div>
    <p>No votes have been given yet.</p>
    </div>
  )
}
}


const App = () => {
  const [selected, setSelected] = useState(0)
  const [pointscounter, setPointscounter] = useState([0, 0, 0, 0, 0, 0])

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]


  const newpoints = [...pointscounter]
  newpoints[selected] = newpoints[selected] += 1

  
  return (
    <div>

      <Showanecdotes anecdotes={anecdotes} selected={selected} pointscounter={pointscounter}></Showanecdotes>  

      <Button handleClick={() => 
        setSelected(Math.floor(Math.random() * 6))
        } text="Next anecdote" />

      <Button handleClick={() => 
        setPointscounter([...newpoints])
        } text="Vote" />

        <Mostvotes pointscounter={pointscounter} anecdotes={anecdotes}></Mostvotes>

    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

export default App;