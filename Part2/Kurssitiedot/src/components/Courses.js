import React from 'react'

const Course = (props) => {

    const items = props.courses
  
    return(
    <div>
  
    {items.map(item => 
    <ul key={item.id}>
    {<Header course={item.name}/>}
    {<Content parts={item.parts} />} 
    {<Total parts={item.parts} />}
    </ul>)}

  </div>
  
  )}

  export default Course;





  
  const Total = (props) => {

    return (
      <div>
          <Countexercises exercises={props}></Countexercises>
      </div>

    )
  }


  const Content = (props) => {
    const result = props
    return (
        <Part result={result}></Part>  
    )
  }


  const Header = (props) => {
    return (
      <div>
          <h2>{props.course}</h2>
      </div>
    )
  }


  const Part = (props) => {
    const result = props.result.parts.map((tulos) => <li key={tulos.id}>{tulos.name}, {tulos.exercises} exercises</li>)
    return (
      <div>
        {result}
      </div>
    )
  }

  const Countexercises = (props) => {

    const exercisesarray = props.exercises.parts.map(tulos => tulos.exercises)
    const sum = exercisesarray.reduce((total, amount) => total + amount); 
  
    return (
      <p style={{fontWeight: 'bold'}}>Total number of exercises {sum} </p>
    )
  
  }