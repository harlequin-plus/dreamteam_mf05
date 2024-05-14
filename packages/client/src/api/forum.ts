import { HTTPTransport } from '../utils/http'
import { serverURL } from '../constants'
import { TCreateTopicResponse, TTopics } from '../models/TTopic'
import { TComment, TComments } from '../models/TComment'

const forumApi = new HTTPTransport()

export default class ForumApi {
  // Topic
  async getTopics() {
    return forumApi.get<TTopics>(`${serverURL}/forum/topic`)
  }

  async createTopic(title: string, comment: string) {
    return forumApi.post<TCreateTopicResponse>(`${serverURL}/forum/topic`, {
      body: {
        title,
        comment,
      },
    })
  }

  async getCommentsByTopicId(id: number) {
    return forumApi.get<TComments>(`${serverURL}/forum/topic/${id}/comments`)
  }

  async deleteTopicById(id: number) {
    return forumApi.delete<void>(`${serverURL}/forum/topic/${id}`)
  }

  // Comment
  async getCommentById(id: number) {
    return forumApi.get<TComment>(`${serverURL}/forum/comment/${id}`)
  }

  async deleteCommentById(id: number) {
    return forumApi.delete<void>(`${serverURL}/forum/comment/${id}`)
  }

  async createComment(topicId: number, content: string) {
    return forumApi.post<TCreateTopicResponse>(`${serverURL}/forum/comment`, {
      body: {
        topicId,
        content,
      },
    })
  }

  async editCommentById(id: number, content: string) {
    return forumApi.post<void>(`${serverURL}/forum/comment`, {
      body: {
        commentId: id, // TODO rename to id
        content,
      },
    })
  }
}
