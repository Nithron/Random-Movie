import { useEffect, useState } from 'react'
import './App.css'
import Tag from './components/Tag'
import Switch from './components/Switch'

function App() {
  const [data, setData] = useState({})
  const [posterPath, setPosterPath] = useState('')
  const [url, setUrl] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [genres, setGenres] = useState([])
  const [selectValue, setSelectValue] = useState('Buscar Série')
  const [tipo, setTipo] = useState('tv/')
  const [tipoBusca, setTipoBusca] = useState([
    { tipo: 'Buscar Série' },
    { tipo: 'Buscar Filme' }
  ])
  const [filter, setFilter] = useState({})
  const [key, setKey] = useState(
    '?api_key=35f5e8c13e1842bd00c3250cc9eac3f2&language=pt-BR'
  )
  const [urlGenre, setUrlGenre] = useState(
    // 'https://api.themoviedb.org/3/genre/movie/list/?api_key=35f5e8c13e1842bd00c3250cc9eac3f2&language=pt-BR'
    'https://api.themoviedb.org/3/genre/movie/list?api_key=35f5e8c13e1842bd00c3250cc9eac3f2&language=pt-BR'
  )
  const options = {
    method: 'GET'
  }
  const [id, setId] = useState(0)

  useEffect(() => {
    const getCategory = () => {
      fetch(urlGenre, { method: 'GET' })
        .then(response => {
          return response.json()
        })
        .then(r => {
          setGenres(r.genres)
          // console.log(genres)
        })
    }
    getCategory()
  }, [])

  useEffect(() => {
    console.log(selectValue)
    switch (selectValue) {
      case 'Buscar Série':
        setTipo('tv/')
        break
      case 'Buscar Filme':
        setTipo('movie/')
        break
      case 'Me Surpreenda':
        if (Math.random() >= 0.5) {
          setTipo('tv/')
        } else setTipo('movie/')
        break
    }
  }, [selectValue])

  useEffect(() => console.log(tipo), [tipo])

  useEffect(() => {
    let buscaOutro = true
    // setShowModal(false)
    fetch(url, options)
      .then(response => {
        if (response.status == 404) {
          setUrl(
            'https://api.themoviedb.org/3/' +
              tipo +
              (Math.random() * (1000 - 1) + 1).toFixed(0) +
              key
          )
        }
        return response.json()
      })
      .then(r => {
        setPosterPath('https://image.tmdb.org/t/p/w300' + String(r.poster_path))
        r.genres.map(function (item, index) {
          console.log(item)
          if (testaGenero(item.name)) {
            console.log('achou if ')
            buscaOutro = false
          }
        })
        if (buscaOutro) {
          console.log('viu que nao é ')
          setUrl(
            'https://api.themoviedb.org/3/' +
              tipo +
              (Math.random() * (1000 - 1) + 1).toFixed(0) +
              key
          )
        }
        if (buscaOutro == false && !r.sucess) {
          setData(r)
          setShowModal(true)
        }
      })
    // }
  }, [url])

  const childToParent = childData => {
    setFilter(childData)
  }

  function testaGenero(genero) {
    let arr = { ...filter }
    let achou = false
    Object.keys(arr).forEach(element => {
      // console.log(arr[element].name + ' - ' + genero)
      if (arr[element].checked) {
        if (genero == arr[element].name) {
          achou = true
        }
      }
    })
    // console.log(arr)
    return achou
  }

  const chamaApi = () => {
    setUrl(
      'https://api.themoviedb.org/3/' +
        tipo +
        (Math.random() * (1000 - 1) + 1).toFixed(0) +
        key
    )
  }

  const handleChange = e => {
    setSelectValue(e.target.value)
  }

  return (
    <div className="full">
      {genres ? (
        <Tag key={genres.id} data={genres} childToParent={childToParent} />
      ) : (
        ''
      )}
      <h1>Não sabe o que assistir?</h1>
      <h2>Clica aqui e deixa que eu te ajudo!!</h2>

      {showModal ? (
        <div className="movie">
          <img src={posterPath}></img>
          <div>
            <div className="titlo">
              <p className="tituloFilme">{data.title}</p>
            </div>
            <div className="sobre">
              <p>Título Original: {data.original_title}</p>
              <p>Gênero: {data.genres[0].name}</p>
              <p>
                Nota: {data.vote_average} Votos: {data.vote_count}
              </p>
            </div>
            <div className="resumo">
              <p>Resumo: {data.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <Switch data={tipoBusca} value={selectValue} onChange={handleChange} />

      {/* <p>{data[0].genres[0].name}</p> */}
      <button onClick={chamaApi}>
        <svg
          className="imgBtn"
          width="36"
          height="26"
          viewBox="0 0 36 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_601_6)">
            <path
              d="M29.3997 0.134083C31.5889 1.99644 33.7782 3.86024 35.9566 5.73491C33.8074 7.65603 31.5729 9.4923 29.3902 11.3799C29.3953 10.1169 29.3822 8.85446 29.3946 7.59212C28.0099 7.59429 26.6253 7.58422 25.2413 7.59654C24.5759 7.59799 23.9499 7.92843 23.5017 8.40525C19.5262 12.5197 15.5427 16.6271 11.5686 20.7432C11.127 21.199 10.5112 21.4968 9.86767 21.491C7.3396 21.5069 4.81065 21.4787 2.28331 21.5076C1.34384 21.4801 0.537885 20.6337 0.538614 19.7039C0.491972 18.6959 1.38546 17.8271 2.38097 17.7973C4.38876 17.7785 6.39874 17.8082 8.40653 17.7836C9.13896 17.7792 9.78393 17.3546 10.246 16.8184C14.161 12.7648 18.0804 8.7146 21.9976 4.66235C22.4378 4.18481 23.0703 3.8906 23.7233 3.87611C25.6137 3.86814 27.505 3.88336 29.3947 3.86879C29.3908 2.62398 29.3807 1.37911 29.3997 0.134083Z"
              fill="url(#paint0_linear_601_6)"
            />
            <path
              d="M1.9486 3.86748C4.68152 3.84495 7.424 3.86966 10.1612 3.86169C10.8667 3.83053 11.5853 4.09358 12.0648 4.6175C13.2024 5.78136 14.3277 6.95892 15.4587 8.12916C15.9222 8.60018 16.1766 9.2857 16.0155 9.93934C15.8399 10.7394 15.0696 11.3755 14.2402 11.3676C13.6769 11.393 13.158 11.1075 12.7433 10.7531C11.9679 9.93137 11.2245 9.07773 10.4368 8.26684C9.98567 7.81031 9.33705 7.58495 8.7001 7.59364C6.66024 7.58495 4.62038 7.59944 2.58045 7.58712C1.76859 7.56248 0.902795 7.18124 0.603266 6.37985C0.141948 5.35954 0.847408 4.06387 1.9486 3.86748Z"
              fill="#8C8C8C"
            />
            <path
              d="M18.6225 14.28C19.3272 13.7199 20.432 13.8011 21.0537 14.4481C21.9055 15.3162 22.7393 16.2025 23.592 17.0699C24.0351 17.5344 24.6735 17.7996 25.317 17.7931C26.6769 17.788 28.0368 17.7989 29.3975 17.7866C29.3836 16.5467 29.3924 15.3068 29.3946 14.0669C31.6006 15.925 33.7898 17.8025 35.9755 19.6844C33.7928 21.5649 31.5983 23.4316 29.4003 25.294C29.3726 24.0258 29.4032 22.757 29.3865 21.4888C27.4939 21.4714 25.6013 21.4873 23.7086 21.4809C23.0564 21.4751 22.4281 21.1656 21.9916 20.6903C20.7724 19.4388 19.5334 18.2069 18.3266 16.9446C17.6277 16.1859 17.7829 14.8735 18.6225 14.28Z"
              fill="#8C8C8C"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_601_6"
              x1="18.2467"
              y1="0.134083"
              x2="18.218"
              y2="22.6374"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#C12A23" />
              <stop
                offset="0.932655"
                stop-color="#102D71"
                stop-opacity="0.63"
              />
              <stop
                offset="0.9999"
                stop-color="#001AFF"
                stop-opacity="0.0260417"
              />
              <stop offset="1" stop-color="#0A3068" stop-opacity="0.66" />
            </linearGradient>
            <clipPath id="clip0_601_6">
              <rect
                x="0.435425"
                y="0.0645151"
                width="35.5645"
                height="25.2903"
                rx="5"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
        Escolher Filme
      </button>
    </div>
  )
}

export default App
