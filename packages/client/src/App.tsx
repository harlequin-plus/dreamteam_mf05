import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import AuthPage from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'
import { useEffect } from 'react'
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
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/auth">Авторизация</Link>
            </li>
          </ul>
        </nav>

        <div className="App">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App
