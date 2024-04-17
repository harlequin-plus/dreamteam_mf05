import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './app/Router'
import './assets/styles/App.scss'

function App() {
  useEffect(() => {
    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }
  }, [])

  return (
    <Router>
      <Header />
      <AppRouter />
      <Footer />
    </Router>
  )
}

export default App
