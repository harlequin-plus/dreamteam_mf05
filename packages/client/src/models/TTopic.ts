import { TUser } from './TUser'

export type TTopic = {
  id: number
  title: string
  User: TUser
  last_message: TLastMessage
}

export type TLastMessage = {
  User: TUser
  time: string
}

export type TTopics = Array<TTopic>

export type TCreateTopicResponse = {
  id: number
}
