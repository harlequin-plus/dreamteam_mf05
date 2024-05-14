import { TUser } from './TUser'

export type TTopic = {
  id: number
  title: string
  User: TUser
  Comments: TLastMessage[]
}

export type TLastMessage = {
  User: TUser
  time: string
}

export type TTopics = Array<TTopic>

export type TCreateTopicResponse = {
  id: number
}
