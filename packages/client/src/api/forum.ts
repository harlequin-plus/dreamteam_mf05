import { HTTPTransport } from '../utils/http'
import { baseURL } from '../constants'
import { TCreateTopicResponse, TTopics } from '../models/TTopic'
import { TComment, TComments } from '../models/TComment'

const forumApi = new HTTPTransport()

export default class ForumApi {
  // Topic
  async getTopics() {
    return forumApi.get<TTopics>(`${baseURL}/forum/topic`)
  }

  async createTopic(title: string, comment: string) {
    return forumApi.post<TCreateTopicResponse>(`${baseURL}/forum/topic`, {
      body: {
        title,
        comment,
      },
    })
  }

  async getCommentsByTopicId(id: number) {
    return forumApi.get<TComments>(`${baseURL}/forum/topic/${id}/comments`)
  }

  async deleteTopicById(id: number) {
    return forumApi.delete<void>(`${baseURL}/forum/topic/${id}`)
  }

  // Comment
  async getCommentById(id: number) {
    return forumApi.get<TComment>(`${baseURL}/forum/comment/${id}`)
  }

  async deleteCommentById(id: number) {
    return forumApi.delete<void>(`${baseURL}/forum/comment/${id}`)
  }

  async createComment(topicId: number, content: string) {
    return forumApi.post<TCreateTopicResponse>(`${baseURL}/forum/comment`, {
      body: {
        topicId,
        content,
      },
    })
  }

  async editCommentById(id: number, content: string) {
    return forumApi.post<void>(`${baseURL}/forum/comment`, {
      body: {
        commentId: id, // TODO rename to id
        content,
      },
    })
  }
}
