import { TAPIError } from '../models/TAPIError'

enum METHODS {
  GET = 'c',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type TResult<TResponse> = {
  status: number
  data: TResponse
}

type HTTPMethod = <R = unknown>(
  url: string,
  param?: { options?: RequestInit; body?: object }
) => Promise<TResult<R> | TResult<TAPIError>>

function handleResponse<R = unknown>(
  response: Response
): Promise<TResult<R> | TResult<TAPIError>> {
  return new Promise<TResult<R> | TResult<TAPIError>>(function (
    resolve,
    reject
  ) {
    response.text().then(text => {
      if (!response.ok) {
        return reject(text)
      }

      if (response.headers.get('content-type')?.includes('application/json')) {
        return resolve({
          status: response.status,
          data: JSON.parse(text),
        })
      } else {
        return resolve({
          status: response.status,
          data: text as R,
        })
      }
    })
  })
}

export class HTTPTransport {
  get: HTTPMethod = async (url, param) => {
    const requestOptions: RequestInit = {
      method: METHODS.GET,
      mode: 'cors',
      credentials: 'include',
    }

    return handleResponse(
      await fetch(url, Object.assign(requestOptions, param?.options))
    )
  }

  post: HTTPMethod = async (url, param = {}) => {
    const requestOptions: RequestInit = {
      method: METHODS.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(param.body),
      mode: 'cors',
      credentials: 'include',
    }

    if (param?.body) {
      requestOptions['body'] = JSON.stringify(param.body)
    }

    return handleResponse(
      await fetch(url, Object.assign(requestOptions, param.options))
    )
  }

  put: HTTPMethod = async (url, param) => {
    const requestOptions: RequestInit = {
      method: METHODS.PUT,
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      credentials: 'include',
    }

    if (param?.body) {
      requestOptions['body'] =
        param?.body instanceof FormData
          ? param.body
          : JSON.stringify(param?.body)
    }

    return handleResponse(
      await fetch(url, Object.assign(requestOptions, param?.options))
    )
  }

  delete: HTTPMethod = async (url, param) => {
    const requestOptions: RequestInit = {
      method: METHODS.DELETE,
      mode: 'cors',
      credentials: 'include',
    }

    return handleResponse(
      await fetch(url, Object.assign(requestOptions, param?.options))
    )
  }
}
