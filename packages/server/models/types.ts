export interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
}

export interface ITopic {
  id: number
  title: string
  UserId: number
  CreatedAt: string
  UpdatedAt?: string
}

export interface IComments {
  id: number
  content: string
  UserId: number
  TopicId: number
  CreatedAt: string
  UpdatedAt: string
}

export interface IReplies {
  id: number
  content: string
  UserId: number
  CommentId: number
  CreatedAt: string
  UpdatedAt?: string
}

export interface IEmoji {
  CommentID: number
  unicod: string
  UserID: number
}
