import { useEffect } from 'react'
import HeaderMenu from './components/HeaderMenu'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './app/Router'
import './App.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <Router>
      <main>
        <HeaderMenu />
        <div className="App">
          <p>Вот тут будет жить ваше приложение :)</p>
          <AppRouter />
        </div>
      </main>
    </Router>
  )
}

export default App
