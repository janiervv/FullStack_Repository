import React from 'react'

const Filter = (props) => {

    const editSearchWord = (event) => {
        props.setSearchWord((event.target.value))
      }
    

return (
    <p>Filter shown with <input value={props.searchWord} onChange={editSearchWord} ></input></p>
)
}

export default Filter;