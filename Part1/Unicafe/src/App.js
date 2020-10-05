//Tämän pitäisi olla valmis!

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  if (props.good+props.bad+props.neutral === 0){
    return (
      <p>No feedback given.</p>
    )
  } else {

  const avg = (props.good - props.bad) / (props.good + props.bad + props.neutral);
  const positive = (props.good) / (props.good + props.bad + props.neutral);

  return(
<table>
<tbody>
<StatisticLine text="Good" value ={props.good} />
<StatisticLine text="Neutral" value ={props.neutral} />
<StatisticLine text="Bad" value ={props.bad} />
<StatisticLine text="All" value ={props.good + props.bad + props.neutral} />
<StatisticLine text="Average" value ={avg} />
<StatisticLine text="Positive" value ={positive} />
</tbody>
</table>
)
}
}

const StatisticLine = (props) => {
  return(
  <tr>
    <th>{props.text}</th> 
    <th>{props.value}</th>
  </tr>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <h1>Statistics</h1>

      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

export default App;
