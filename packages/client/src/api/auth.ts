import { baseURL } from '../constants'
import { oauthRedirectURI } from '../constants'
import { TSignUpInput, TSignUpResponse } from '../models/TSignUp'
import { TAPIError } from '../models/TAPIError'
import { TSignInInput } from '../models/TSignIn'
import { TUser } from '../models/TUser'
import { http, TResult } from '../utils/http'
import { TServiceID } from '../models/TServiceID'
import { TOauthDataType } from '../models/TOauthDataType'

export default class AuthApi {
  async signUp(
    data: TSignUpInput
  ): Promise<TResult<TSignUpResponse | TAPIError>> {
    return http.post<TSignUpResponse>(`${baseURL}/auth/signup`, data)
  }

  async signIn(data: TSignInInput): Promise<TResult<void | TAPIError>> {
    return http.post<void>(`${baseURL}/auth/signin`, data)
  }

  async getUser(): Promise<TResult<TUser | TAPIError>> {
    return http.get<TUser>(`${baseURL}/auth/user`)
  }

  async logout(): Promise<TResult<void | Error>> {
    return http.post<void>(`${baseURL}/auth/logout`, {})
  }

  async oauthGetServiceID(): Promise<TResult<TServiceID | TAPIError>> {
    return http.get<TServiceID>(
      `${baseURL}/oauth/yandex/service-id?${new URLSearchParams({
        redirect_uri: oauthRedirectURI,
      })}`
    )
  }

  async oauthSignInWithYandex(
    data: TOauthDataType
  ): Promise<TResult<void | TAPIError>> {
    return http.post<void>(`${baseURL}/oauth/yandex`, data)
  }
}
