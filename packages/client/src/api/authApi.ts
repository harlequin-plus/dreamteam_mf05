import { baseURL } from '../constants'
import {
  SignUpDataType,
  SignUpResponse,
  APIError,
  SignInDataType,
  User,
} from './authApiTypes'

class AuthApi {
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

const authApi = new AuthApi()
export default authApi
