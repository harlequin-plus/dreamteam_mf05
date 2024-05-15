import { TEmoji, TEmojis } from '../models/TEmoji'
import { HTTPTransport } from '../utils/http'
import { serverURL } from '../constants'

const emojiApi = new HTTPTransport()
type CommentId = TEmoji['CommentId']

export default class EmojiApi {
  async getEmojis(CommentId: CommentId) {
    const params = new URLSearchParams({
      CommentId: String(CommentId),
    }).toString()
    return emojiApi.get<TEmojis>(`${serverURL}/forum/emoji${params}`)
  }

  async addEmoji(data: TEmoji) {
    return emojiApi.post<TEmoji>(`${serverURL}/forum/emoji`, {
      body: data,
    })
  }
}
