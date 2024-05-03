export interface IUser {
  userId: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
}

export interface ITopic {
  topicId?: number
  title: string
  author: number
}

export interface IComments {
  commentsId?: number
  content: string
  author: number
  topic: number
}
