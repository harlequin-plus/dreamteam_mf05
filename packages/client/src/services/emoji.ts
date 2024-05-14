import { responseHasError } from '../utils/api.utils'
import EmojiApi from '../api/emoji'
import { TEmoji } from '../models/TEmoji'

const emojiApi = new EmojiApi()

const getAllEmojisOfComment = async (data: TEmoji['CommentId']) => {
  const response = await emojiApi.getEmojis(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

const addNewEmoji = async (data: TEmoji) => {
  const response = await emojiApi.addEmoji(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}
