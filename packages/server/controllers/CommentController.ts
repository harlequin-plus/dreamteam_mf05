import { Request, Response } from 'express'
import { getTopicbyId } from '../services/topics'
import { createComment } from '../services/comments'
import { getUserIdFromApi } from '../api/auth'
import serialize from 'serialize-javascript'

class CommentAPI {
  public static create = async (req: Request, res: Response) => {
    const UserId = await getUserIdFromApi(req)
    const { topicId, content } = req.body

    if (
      topicId &&
      content &&
      typeof topicId == 'number' &&
      typeof content == 'string'
    ) {
      const topic = await getTopicbyId(topicId)
      if (!topic) {
        res.status(400).send({ reason: 'Topic is not exist' })
        return
      }
      const TopicId = await createComment({
        content: serialize(content),
        TopicId: topicId,
        UserId,
      })
      res.status(200).send({ id: TopicId })
      return
    }
    res.status(400).send({ reason: 'Bad request' })
  }
}

export default CommentAPI
