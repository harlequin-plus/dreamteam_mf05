import { responseHasError } from '../utils/api.utils'
import EmojiApi from '../api/emoji'
import { TEmoji } from '../models/TEmoji'

const emojiApi = new EmojiApi()

export const getAllEmojisOfComment = async (
  data: TEmoji['CommentId']
): Promise<TEmoji[]> => {
  const response = await emojiApi.getEmojis(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
  return response.data
}

export const addNewEmoji = async (data: TEmoji): Promise<TEmoji> => {
  const response = await emojiApi.addEmoji(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
  return response.data
}
