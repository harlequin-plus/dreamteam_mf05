import axios from 'axios'
import { IUser } from '../models/types'

export const getUserFromApi = async (req: any): Promise<IUser> => {
  const { data } = await axios.get(
    `https://ya-praktikum.tech/api/v2/auth/user`,
    {
      headers: {
        cookie: req.headers['cookie'],
      },
    }
  )
  return data
}

export const getUserIdFromApi = async (req: any): Promise<number> => {
  const { data } = await axios.get(
    `https://ya-praktikum.tech/api/v2/auth/user`,
    {
      headers: {
        cookie: req.headers['cookie'],
      },
    }
  )
  return data.id
}
