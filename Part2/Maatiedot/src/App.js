import React, { useState, useEffect } from 'react';
import axios from 'axios'


function App() {

  const [searchWord, setSearchWord] = useState("")
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [updated, setUpdated] = useState(false)

  const editSearchWord = (event) => {
    setSearchWord(event.target.value)
    setUpdated(false)
  }

  const filtered = countries.filter(item => {
    return item.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  const getWeather = (props) => {
    console.log("tulee getwetaheriin")
    if (updated === false) {
    axios
    .get(`http://api.weatherstack.com/current?access_key=XXXXXXXXXXXXXXXXXXXX&query=${props}`)
    .then(response => {
      console.log(response.data)
      setUpdated(true)
      setWeather([response.data.current.temperature, response.data.current.weather_descriptions[0], response.data.current.weather_icons])
    })
    
  }
  }

  const showCountryData = (props) => {
    console.log("tulee countrydataan")
    getWeather(props[0].capital)
    console.log(props[0].flag)
    return (
      <div>
      <h1>{props[0].name}</h1>
      <p>Capital: {props[0].capital} </p>
      <p>Population: {props[0].population}</p>
      <p>Languages:</p> {(props[0].languages).map(data => <ul key = {data.name}> {data.name}</ul>)}
      <img src={props[0].flag} height={140}></img>

      <h2> Weather in {props[0].capital}</h2>

      <p>Temperature: {weather[0]} degrees.</p>
      <p>Description: {weather[1]}</p>
      <img src={weather[2]} height={100}></img>
      </div>
    )
  }
  
  const showFilteredItems = (filtered) => {
    console.log("tulee showfilteriin")
  if (filtered.length  > 1 && filtered.length < 10) {
    return (
  filtered.map(data => <ul key = {data.name}>{data.name} 
  {<button onClick={() => setSearchWord(data.name)}>Show</button>}</ul>)
    )
  } else if (filtered.length  > 10 && filtered.length < 240) {
    return "Too many results, please specify another filter"
  } else if (filtered.length  > 239) {
    return "Please enter a search term"
  } else if (filtered.length === 1){
    return showCountryData(filtered)
  }
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data.map(data => data))
        
      })
  }, [])

  return (
  <div>
    <h1>Country information</h1>
    
    Find countries: <input value={searchWord} onChange={editSearchWord}></input>

      <div>{showFilteredItems(filtered)}</div>
      
    </div>
  );
}

export default App;
