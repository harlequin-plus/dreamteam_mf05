import { TSignUpInput } from '../models/TSignUp'
import { TSignInInput } from '../models/TSignIn'
import { responseHasError } from '../utils/api.utils'
import AuthApi from '../api/auth'
import { TUser } from '../models/TUser'
import { TServiceID } from '../models/TServiceID'
import { TOauthDataType } from '../models/TOauthDataType'

const authApi = new AuthApi()

const signUp = async (data: TSignUpInput) => {
  const response = await authApi.signUp(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

const signIn = async (data: TSignInInput) => {
  const response = await authApi.signIn(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

const getUser = async () => {
  const response = await authApi.getUser()
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data as TUser
}

const logout = async () => {
  const response = await authApi.logout()
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

const oauthGetServiceID = async () => {
  const response = await authApi.oauthGetServiceID()
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data as TServiceID
}

const oauthSignInWithYandex = async (data: TOauthDataType) => {
  const response = await authApi.oauthSignInWithYandex(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

export {
  signUp,
  signIn,
  getUser,
  logout,
  oauthGetServiceID,
  oauthSignInWithYandex,
}
