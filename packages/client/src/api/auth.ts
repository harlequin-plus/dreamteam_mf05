import { baseURL } from '../constants'
import { oauthRedirectURI } from '../constants'
import { TSignUpInput, TSignUpResponse } from '../models/TSignUp'
import { TSignInInput } from '../models/TSignIn'
import { TUser } from '../models/TUser'
import { HTTPTransport } from '../utils/http'
import { TServiceID } from '../models/TServiceID'
import { TOauthDataType } from '../models/TOauthDataType'

const authApi = new HTTPTransport()

export default class AuthApi {
  async signUp(data: TSignUpInput) {
    return authApi.post<TSignUpResponse>(`${baseURL}/auth/signup`, {
      body: data,
    })
  }

  async signIn(data: TSignInInput) {
    return authApi.post<void>(`${baseURL}/auth/signin`, {
      body: data,
    })
  }

  async getUser() {
    return authApi.get<TUser>(`${baseURL}/auth/user`)
  }

  async logout() {
    return authApi.post<void>(`${baseURL}/auth/logout`)
  }

  async oauthGetServiceID() {
    return authApi.get<TServiceID>(
      `${baseURL}/oauth/yandex/service-id?${new URLSearchParams({
        redirect_uri: oauthRedirectURI,
      })}`
    )
  }

  async oauthSignInWithYandex(data: TOauthDataType) {
    return authApi.post<void>(`${baseURL}/oauth/yandex`, {
      body: data,
    })
  }
}
