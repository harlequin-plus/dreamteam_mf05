import AuthApi from '../api/authApi'
import { SignUpDataType, SignInDataType } from '../api/authApi'
import { useState, useEffect } from 'react'

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
    console.log('Ошибка в signIn:', error)
    console.log('переходим на страницу ошибки')
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
    console.log('переходим на страницу ошибки')
    return
  }
}

const logout = async () => {
  try {
    const status = await authApi.logout()
    if (status === 200) {
      console.log('устанавливаем в сторе user:null')
      console.log('переходим на страницу LogIn')
    }
  } catch (error) {
    console.log(error)
    console.log('переходим на страницу ошибки')
    return
  }
}

// **************************hooks*****************************

const useGetUser = () => {
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

export { signUp, signIn, getUser, logout, useGetUser }

// const test = {
//   first_name: 'Vasia25',
//   second_name: 'vasin25',
//   login: 'vasia2567',
//   email: 'mail@vas25.com',
//   password: '13456743223LL',
//   phone: '+79345676',
// }
