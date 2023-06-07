
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Weather from './components/Weather'
import Loader from './components/Loader'

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null )

  const success = (pos) => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const API_KEY = "580e8f076ab2bcb71b57c4cf98aa9bf5"

    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    axios.get(URL)
      .then(({ data }) => setWeatherInfo(data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <main className='"text-center grid gap-0" fixed w-full  min-h-screen text-white justify-center items-center font-principal-font p-40'>
            <div className='bg-white/40 w-70 p-2 rounded-md text-left '>
                <input
                    type="text"
                    placeholder='Search for a city'
                    className='  bg-transparent font-bold uppercase text-left items-center' />
            </div>
      {
        weatherInfo ? <Weather weatherInfo={weatherInfo} /> : <Loader />
      }

    </main>
  )
}

export default App
