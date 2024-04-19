import authApi from '../api/authApi'
import {
  SignUpDataType,
  SignInDataType,
  OauthDataType,
} from '../api/authApiTypes'

const signUp = async (data: SignUpDataType) => {
  try {
    const signUpResponse = await authApi.signUp(data)
    if ('reason' in signUpResponse) {
      throw Error(signUpResponse.reason)
    }
  } catch (error) {
    console.log(error)
    return
  }
}
const signIn = async (data: SignInDataType) => {
  try {
    const signInResponse = await authApi.signIn(data)
    if (signInResponse && 'reason' in signInResponse) {
      throw Error(signInResponse.reason)
    }
    console.log('вход выполнен, загружаем User')
  } catch (error) {
    console.log('Ошибка в signIn:', error)
    return
  }
}

const getUser = async () => {
  try {
    const userResponse = await authApi.getUser()
    if ('reason' in userResponse) {
      throw Error(userResponse.reason)
    }

    return userResponse
  } catch (error) {
    console.log(error)
    return
  }
}

const logout = async () => {
  try {
    const status = await authApi.logout()
    if (status === 200) {
      console.log('устанавливаем в сторе user:null')
    }
  } catch (error) {
    console.log(error)
  }
}

const getServiceID = async () => {
  try {
    const response = await authApi.oauthGetServiceID()
    if ('reason' in response) {
      throw Error(response.reason)
    }
    return response.service_id
  } catch (error) {
    console.log(error)
  }
}
const signInWithYandex = async (data: OauthDataType) => {
  try {
    const response = await authApi.oauthSignInWithYandex(data)
    if (response && 'reason' in response) {
      throw Error(response.reason)
    }
  } catch (error) {
    console.log(error)
  }
}

export { signUp, signIn, getUser, logout, getServiceID, signInWithYandex }

// const test = {
//   first_name: 'Vasia25',
//   second_name: 'vasin25',
//   login: 'vasia2567',
//   email: 'mail@vas25.com',
//   password: '13456743223LL',
//   phone: '+79345676',
// }
