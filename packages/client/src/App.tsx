import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './app/Router'
import './assets/styles/App.scss'
import { useAppDispatch } from './hooks/reduxTsHook'
import { fetchUser } from './store/userState'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }
    // fetchServerData()
    dispatch(fetchUser())
  }, [])

  return (
    <Router>
      <main>
        <Header />
        <div id="app">
          <AppRouter />
        </div>
        <Footer />
      </main>
    </Router>
  )
}

export default App
