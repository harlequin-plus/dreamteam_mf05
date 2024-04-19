import { baseURL } from '../constants'
import {
  SignUpDataType,
  SignUpResponse,
  APIError,
  SignInDataType,
  User,
  OauthDataType,
  ServiceID,
} from './authApiTypes'
import { makeRequest } from '../utils/makeRequest'
import { oauthRedirectURI } from '../constants'

class AuthApi {
  async signUp(data: SignUpDataType): Promise<SignUpResponse | APIError> {
    const response = await makeRequest(`${baseURL}/auth/signup`, { body: data })
    return response.json()
  }
  async signIn(data: SignInDataType): Promise<undefined | APIError> {
    const response = await makeRequest(`${baseURL}/auth/signin`, { body: data })
    if (response.status !== 200) {
      return response.json()
    }
  }
  async getUser(): Promise<User | APIError> {
    const response = await makeRequest(`${baseURL}/auth/user`)
    return response.json()
  }
  async logout(): Promise<number | Error> {
    const logOut = await fetch(`${baseURL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    if (logOut.status === 200) {
      return logOut.status
    } else {
      throw new Error('logout не выполнен')
    }
  }
  async oauthGetServiceID(): Promise<ServiceID | APIError> {
    const response = await makeRequest(
      `${baseURL}/oauth/yandex/service-id?${new URLSearchParams({
        redirect_uri: oauthRedirectURI,
      })}`
    )
    return response.json()
  }

  async oauthSignInWithYandex(
    data: OauthDataType
  ): Promise<undefined | APIError> {
    const response = await makeRequest(`${baseURL}/oauth/yandex`, {
      body: data,
    })
    if (response.status !== 200) {
      return response.json()
    }
  }
}

const authApi = new AuthApi()

export default authApi
