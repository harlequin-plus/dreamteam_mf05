import { TUser } from './TUser'

export type TTopic = {
  id: number
  title: string
  TS: string
  last_message: TLastMessage
}

export type TLastMessage = {
  user: TUser
  time: string
}

export type TTopics = Array<TTopic>

export type TCreateTopicResponse = {
  id: number
}
