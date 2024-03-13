import { useEffect } from 'react'
import './App.css'
import { signIn, signUp, logout, getUser, useGetUser } from './api/authApi'

const testData = {
  first_name: 'Vasss',
  second_name: 'Vasssfamily',
  login: 'vassabra',
  email: 'abra@vas.ru',
  password: '12345678910FVB',
  phone: '+74447777790',
}
// signUp(testData)
// logout()
// getUser()
// signIn({ login: 'vassabra', password: '12345678910FVB' })

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

  //     fetchServerData()
  //   }, [])
  return <div className="App">Вот тут будет жить ваше приложение :)</div>
}

export default App
