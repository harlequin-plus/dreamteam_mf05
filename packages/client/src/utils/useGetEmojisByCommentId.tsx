import { TEmoji } from '../models/TEmoji'
import { useState, useEffect } from 'react'
import { getAllEmojisOfComment } from '../services/emoji'

export default function useGetEmojisByCommentId(commentId: number) {
  const [emojis, setEmojis] = useState<TEmoji[]>([])
  const [isEmojisLoading, setIsEmojisLoading] = useState(true)
  const [emojisError, setEmojisError] = useState(false)

  useEffect(() => {
    const allEmojisOfComment = async (id: number) => {
      const emojis = await getAllEmojisOfComment(id)
      if (emojis) {
        setEmojis(emojis)
        setIsEmojisLoading(false)
      } else {
        setIsEmojisLoading(false)
      }
    }
    try {
      allEmojisOfComment(commentId)
    } catch (error: unknown) {
      setEmojisError(true)
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }, [commentId])

  return { emojis, isEmojisLoading, emojisError }
}
