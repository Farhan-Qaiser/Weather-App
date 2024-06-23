import { useState } from 'react'
import axios, { Axios } from 'axios'
import './index.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)


  const apiKey = 'ec91fb96f0ae97579a33f27814a04c16'

  const getWeather = async(city)=>{
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      setWeather(response.data)
      setError(null)
    } catch (error) {
      setError('City not found !')
      setWeather(null)
    }
  }
  const handleSubmit = (e)=>{getWeather(city)
    e.preventDefault()
  }
  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit} className='form'>
      <h1>Weather</h1>
      <input type="text" placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)}/>
      <button type='submit'>Enter</button>
     </form>
     {error && <p>{error}</p>}
     {weather && 
     <div className='details'>
     <h1 className='city'>{weather.name}</h1>
     <h1 className='deg'>{Math.floor(weather.main.temp - 273.15)}&deg;C</h1>
     <h2 className='temp'>{weather.weather[0].description}</h2>
     <img src={`https:/openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
     </div>
     }

     </div>
    </>
  )
}

export default App
