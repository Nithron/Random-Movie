import './index.css'
import { useEffect, useState } from 'react'

function Tag(props) {
  const [data, setData] = useState({})
  const [tag, setTag] = useState('tag')
  const [selected, setSelected] = useState([
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false }
  ])
  const [displayComponent, setDisplayComponent] = useState(false)

  // useEffect(() => {
  //   var aux = { ...props.data }

  //   props.data.forEach((element, index) => {
  //     Object.assign(aux[index], { id: false })
  //   })

  //   setSelected(aux)
  // }, [props.data])

  const toggleCheck = item => () => {
    var aux = { ...props.data }
    props.data.forEach((element, index) => {
      if (item.id == element.id) {
        if (selected[index].checked) {
          aux[index].checked = false
        } else aux[index].checked = true
      }
      setSelected(aux)
      props.childToParent(aux)
    })
  }

  return (
    <div className="categorias">
      {props.data.map((item, index) => {
        return selected[index].checked ? (
          <button className="tagSelected" onClick={toggleCheck(item)}>
            {item.name}
          </button>
        ) : (
          <button className="tag" onClick={toggleCheck(item)}>
            {item.name}
          </button>
        )
      })}
    </div>
  )
}

export default Tag
