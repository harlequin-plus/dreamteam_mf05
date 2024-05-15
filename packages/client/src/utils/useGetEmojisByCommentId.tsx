import { TEmoji } from '../models/TEmoji'
import { useState, useEffect } from 'react'
import { getAllEmojisOfComment } from '../services/emoji'

export default function useGetEmojisByCommentId(commentId: number) {
  const [emojis, setEmojis] = useState<TEmoji[]>([])
  const [isEmojisLoading, setIsEmojisLoading] = useState(true)
  const [renderHook, setRenderHook] = useState(false)

  const render = () => setRenderHook(renderHook => !renderHook)

  useEffect(() => {
    const allEmojisOfComment = async (id: number) => {
      console.log('вызвали хук', id)
      try {
        const emojis = await getAllEmojisOfComment(id)
        if (emojis) setEmojis(emojis)
        setIsEmojisLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    allEmojisOfComment(commentId)
  }, [renderHook])

  return { emojis, isEmojisLoading, render }
}
