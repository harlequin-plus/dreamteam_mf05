import { TResult } from './http'
import { TAPIError } from '../models/TAPIError'

export const responseHasError = (
  response: TResult<unknown>
): response is TResult<TAPIError> => {
  switch (response.status) {
    case 200:
      return false
    case 500:
      window.location.href = 'error/500'
      return false
    default: {
      return true
    }
  }
}
