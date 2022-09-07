import './index.css'
import { useEffect, useState } from 'react'

function Switch(props) {
  return (
    <select onChange={props.handleChange} {...props}>
      {props.data.map(element => {
        return <option>{element.tipo}</option>
      })}

      <option>Me surpreenda</option>
    </select>
  )
}

export default Switch
