import { baseURL } from '../constants'

export type SignUpDataType = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}
type SignUpResponse = {
  id: number
}
type APIError = {
  reason: string
}

export type SignInDataType = {
  login: string
  password: string
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
      .then(response => {
        if (response.ok) {
          return
        } else {
          return response.json()
        }
      })
      .then(data => {
        if (!data) return
        console.log('AuthApi.signIn', data)
        return data
      })
    return signIn
  }
  async getUser(): Promise<User | APIError> {
    const getUser = await fetch(`${baseURL}/auth/user`, {
      credentials: 'include',
      mode: 'cors',
    })
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
      credentials: 'include',
      mode: 'cors',
    })
    if (logOut.status === 200) {
      return logOut.status
    } else {
      throw new Error('logout не выполнен')
    }
  }
}
