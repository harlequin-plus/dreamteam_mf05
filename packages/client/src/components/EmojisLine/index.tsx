import AddEmoji from '../AddEmoji'
import { Box, Tooltip, Typography } from '@mui/material'
import { TEmojis, TEmoji } from '../../models/TEmoji'
import { addNewEmoji } from '../../services/emoji'
import useGetEmojisByCommentId from '../../utils/useGetEmojisByCommentId'

type EmojisDTO = {
  [key in TEmoji['unicode']]: Array<TEmoji['UserId']>
}

function prepareData(data: TEmojis) {
  const result: EmojisDTO = {}
  for (let i = 0; i < data.length; i++) {
    const unicode = data[i]?.unicode
    if (result?.[unicode]) {
      result[unicode].push(data[i].UserId)
    } else {
      result[unicode] = [data[i].UserId]
    }
  }
  return Object.entries(result)
}

type Props = {
  CommentId: number
  UserId: number
}
export default function EmojisLine({ CommentId, UserId }: Props) {
  const { emojis, isEmojisLoading, render } = useGetEmojisByCommentId(CommentId)

  const insertEmoji = async (unicode: string) => {
    await addNewEmoji({ CommentId, unicode, UserId })
      .then(() => {
        render()
      })
      .catch(value => {
        console.log('error send newEmoji to DB', value)
      })
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <AddEmoji fontSize={1.4} horizontal={'right'} insertEmoji={insertEmoji} />
      {!isEmojisLoading && emojis && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {prepareData(emojis).map(([key, value], index) => (
            <Tooltip
              key={index}
              title={value.map(item => item.toString()).join(', ')}
              placement="top">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5px',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '13px',
                  padding: '1px 5px',
                }}>
                <Typography>{key}</Typography>
                {value.length}
              </Box>
            </Tooltip>
          ))}
        </Box>
      )}
    </Box>
  )
}
