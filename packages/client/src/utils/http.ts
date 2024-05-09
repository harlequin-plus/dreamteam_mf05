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

function get<TResponse>(url: string, options: RequestInit = {}) {
  const requestOptions: RequestInit = {
    method: METHODS.GET,
    mode: 'cors',
    credentials: 'include',
  }
  return fetch(url, Object.assign(requestOptions, options)).then(
    handleResponse<TResponse>
  )
}

function post<TResponse>(url: string, body: object, options: RequestInit = {}) {
  const requestOptions: RequestInit = {
    method: METHODS.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    mode: 'cors',
    credentials: 'include',
  }
  return fetch(url, Object.assign(requestOptions, options)).then(
    handleResponse<TResponse>
  )
}

function put<TResponse>(url: string, body: object, options: RequestInit = {}) {
  const requestOptions: RequestInit = {
    method: METHODS.PUT,
    headers: { 'Content-Type': 'application/json' },
    body: body instanceof FormData ? body : JSON.stringify(body),
    mode: 'cors',
    credentials: 'include',
  }
  return fetch(url, Object.assign(requestOptions, options)).then(
    handleResponse<TResponse>
  )
}

function _delete<TResponse>(url: string, options: RequestInit = {}) {
  const requestOptions: RequestInit = {
    method: METHODS.DELETE,
    mode: 'cors',
    credentials: 'include',
  }
  return fetch(url, Object.assign(requestOptions, options)).then(
    handleResponse<TResponse>
  )
}

function handleResponse<TResponse>(response: Response) {
  return new Promise<TResult<TResponse>>(function (resolve, reject) {
    response.text().then(text => {
      if (!response.ok) {
        reject(text)
      }

      if (response.headers.get('content-type')?.includes('application/json')) {
        resolve({
          status: response.status,
          data: JSON.parse(text),
        })
      } else {
        resolve({
          status: response.status,
          data: text as TResponse,
        })
      }
    })
  })
}

export const http = {
  get,
  post,
  put,
  delete: _delete,
}
