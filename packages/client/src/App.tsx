import { useEffect } from 'react'
import HeaderMenu from './components/HeaderMenu'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './app/Router'

function App() {
  useEffect(() => {
    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }
    // fetchServerData()
  }, [])

  return (
    <Router>
      <main>
        <HeaderMenu />
        <div id="app">
          <AppRouter />
        </div>
      </main>
    </Router>
  )
}

export default App
