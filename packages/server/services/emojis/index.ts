import { Emojis } from '../../models/Emojis'
import { IEmoji } from '../../models/types'

// Создание emoji
export async function createEmoji({ commentID, unicod, userID }: IEmoji) {
  const emoji = await Emojis.findOne({ where: { commentID, unicod, userID } })
  if (emoji) return
  return Emojis.create({ commentID, unicod, userID })
}

// Удаление emoji по ID сообщения и ID юзера
export async function deleteUserByIds({
  commentID,
  userID,
}: Omit<IEmoji, 'unicod'>) {
  return Emojis.destroy({ where: { commentID, userID } })
}

//получение всех emoji в сообщении
export async function getEmojisByCommentID({
  commentID,
}: Pick<IEmoji, 'commentID'>) {
  return Emojis.findAll({ where: { commentID } })
}
