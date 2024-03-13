type SignUpDataType = {
  first_name: 'string'
  second_name: 'string'
  login: 'string'
  email: 'string'
  password: 'string'
  phone: 'string'
}
type SignUpResponse = {
  id: number
}
type APIError = {
  reason: string
}

type SignInDataType = {
  login: 'string'
  password: 'string'
}
type User = {
  id: 123
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

const baseURL = 'https://ya-praktikum.tech/api/v2'

export default class AuthApi {
  async signUp(data: SignUpDataType): Promise<SignUpResponse | APIError> {
    const signUp = await fetch(`${baseURL}/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('AuthApi.signUp', data)
        return data
      })
    return signUp
  }
  async signIn(data: SignInDataType): Promise<void | APIError> {
    const signIn = await fetch(`${baseURL}/auth/signin`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('AuthApi.signIn', data)
        return data
      })
    return signIn
  }
  async getUser(): Promise<User | APIError> {
    const getUser = await fetch(`${baseURL}/auth/user`)
      .then(response => response.json())
      .then(data => {
        console.log('AuthApi.getUser', data)
        return data
      })
    return getUser
  }

  async logout(): Promise<number | Error> {
    const logOut = await fetch(`${baseURL}/auth/logout`, {
      method: 'POST',
    })
    if (logOut.status === 200) {
      return logOut.status
    } else {
      throw new Error('logout не выполнен')
    }
  }
}

// **************************services*****************************
const authApi = new AuthApi()

const signUp = async (data: SignUpDataType) => {
  //  const navigate = useNavigate();
  try {
    const signUpResponse = await authApi.signUp(data)
    if ('reason' in signUpResponse) {
      throw Error(signUpResponse.reason)
    }
    const getUserResponse = await authApi.getUser()
    if ('reason' in getUserResponse) {
      throw Error(getUserResponse.reason)
    }
    console.log('устанавливаем в стор', getUserResponse)
    console.log('переходим на страницу...')
  } catch (error) {
    console.log(error)
    console.log('переходим на страницу ошибки')
    return
  }
}
const signIn = async (data: SignInDataType) => {
  try {
    const signInResponse = await authApi.signIn(data)
    if (signInResponse && 'reason' in signInResponse) {
      throw Error(signInResponse.reason)
    }
    console.log('вход выполнен')
  } catch (error) {
    console.log(error)
    console.log('переходим на страницу ошибки')
    return
  }
}
// **************************hooks*****************************
import { useState, useEffect } from 'react'

// const authApi = new AuthApi()

// const useSignUp = (data: SignUpDataType) => {
//   //     const navigate = useNavigate();
//   const [state, setState] = useState({
//     isLoading: true,
//     user: {},
//     error: false,
//   })

//   const signUp = async () => {
//     try {
//       const signUpResponse = await authApi.signUp(data)
//       if ('reason' in signUpResponse) {
//         throw Error(signUpResponse.reason)
//       }
//       const getUserResponse = await authApi.getUser()
//       if ('reason' in getUserResponse) {
//         throw Error(getUserResponse.reason)
//       }
//       setState({ ...state, isLoading: false, user: getUserResponse })
//       console.log('устанавливаем в стор', getUserResponse)
//       console.log('переходим на страницу...')
//     } catch (error) {
//       console.log('переходим на страницу ошибки')
//       setState({ ...state, isLoading: false, error: true })
//     }
//   }

//   useEffect(() => {
//     signUp()
//   }, [])

//   return state
// }

const useGetUser = (data: User) => {
  //     const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: true,
    user: {},
    error: false,
  })

  const getUser = async () => {
    try {
      const getUserResponse = await authApi.getUser()
      if ('reason' in getUserResponse) {
        throw Error(getUserResponse.reason)
      }
      setState({ ...state, isLoading: false, user: getUserResponse })
      console.log('User:', getUserResponse)
    } catch (error) {
      console.log(error)
      console.log('переходим на страницу ошибки')
      setState({ ...state, isLoading: false, error: true })
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return state
}
