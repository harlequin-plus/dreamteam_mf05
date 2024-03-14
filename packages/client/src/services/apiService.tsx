import AuthApi from '../api/authApi'

import { apiHasError } from '../utils/apiHasError'

const authApi = new AuthApi()

const getUser = async () => {
  const userResponse = await authApi.getUser()
  if (apiHasError(userResponse)) {
    throw new Error(userResponse.reason)
  }
  return userResponse
}

export { getUser }
