import axios, { AxiosError, AxiosInstance } from 'axios'
import { baseURL } from '../constants'

export default class BaseApi {
  private baseUrl: string
  private axios: AxiosInstance
  constructor(url: string) {
    this.baseUrl = `${baseURL}${url}`
    this.axios = axios.create({
      baseURL: this.baseUrl,
    })
    this.axios.defaults.withCredentials = true
    this.axios.defaults.headers.post = { 'Content-Type': 'application/json' }
  }

  public async get<T>(url: string) {
    try {
      const { data } = await this.axios.get<T>(url)
      return data
    } catch (error) {
      this.errorHandler(error)
    }
  }

  public async post<T, Data>(url: string, reqData: Data) {
    try {
      const { data } = await this.axios.post<T>(url, { ...reqData })
      return data
    } catch (error) {
      this.errorHandler(error)
    }
  }

  public async put<T, Data>(url: string, reqData: Data) {
    try {
      const { data } = await this.axios.put<T>(url, { ...reqData })
      return data
    } catch (error) {
      this.errorHandler(error)
    }
  }

  public async delete<T, Data>(url: string, reqData: Data) {
    try {
      const { data } = await this.axios.delete<T>(url, { data: reqData })
      return data
    } catch (error) {
      this.errorHandler(error)
    }
  }

  public async putWithoutHeaders<T>(url: string, file: File) {
    const avatarAxios = axios.create({ baseURL: this.baseUrl })
    avatarAxios.defaults.withCredentials = true
    try {
      const { data } = await avatarAxios.putForm<T>(url, { avatar: file })
      return data
    } catch (error) {
      this.errorHandler(error)
    }
  }

  private errorHandler(error: unknown): never {
    if (error instanceof AxiosError && error.response?.data.reason) {
      if (error.response.status === 500) {
        window.location.href = 'error/500'
      }

      throw new Error(error.response?.data.reason)
    } else {
      throw error
    }
  }
}
