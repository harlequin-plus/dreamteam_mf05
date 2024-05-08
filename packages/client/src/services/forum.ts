import ForumApi from '../api/forum'
import { responseHasError } from '../utils/api.utils'

const forumApi = new ForumApi()

const getTopics = async () => {
  const response = await forumApi.getTopics()
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data
}

const createTopic = async (title: string, comment: string) => {
  const response = await forumApi.createTopic(title, comment)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data.id
}

const getCommentsByTopicId = async (id: number) => {
  const response = await forumApi.getCommentsByTopicId(id)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data
}

const deleteTopicById = async (id: number) => {
  const response = await forumApi.deleteTopicById(id)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

const getCommentById = async (id: number) => {
  const response = await forumApi.getCommentById(id)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data
}

const deleteCommentById = async (id: number) => {
  const response = await forumApi.deleteCommentById(id)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

const createComment = async (topicId: number, content: string) => {
  const response = await forumApi.createComment(topicId, content)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data.id
}

const editCommentById = async (topicId: number, content: string) => {
  const response = await forumApi.createComment(topicId, content)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

export {
  getTopics,
  createTopic,
  getCommentsByTopicId,
  deleteTopicById,
  getCommentById,
  deleteCommentById,
  createComment,
  editCommentById,
}
