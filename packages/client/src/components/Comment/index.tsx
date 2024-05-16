import { FC } from 'react'
import {
  Avatar,
  Box,
  Button,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { TUser } from '../../models/TUser'
import EmojisLine from '../EmojisLine'
import DeleteIcon from '@mui/icons-material/Delete'
import { format, parseISO } from 'date-fns'
// import { getAllEmojisOfComment } from '../../services/emoji'
import useGetEmojisByCommentId from '../../utils/useGetEmojisByCommentId'

type OwnProps = {
  commentId: number
  content: string
  User: TUser
  date: string
  ordinalNumber: number
  handleDeleteComment: () => void
}

const Comment: FC<OwnProps> = ({
  commentId,
  content,
  User,
  date,
  ordinalNumber,
  handleDeleteComment,
}) => {
  const avatar = User?.avatar ? `${User.avatar}` : ''
  const display_name = User?.display_name
    ? User?.display_name
    : `Пользователь ${User.id}`

  const displayFullDate = format(parseISO(date), 'dd.MM.yyyy hh:mm')

  return (
    <TableRow>
      <TableCell width={'20%'}>
        <Box display={'flex'} alignItems="center" flexDirection="column">
          <Avatar src={avatar} sx={{ width: 56, height: 56 }} />
          <Typography p={1} variant="subtitle1">
            {display_name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell width={'70%'}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'} variant="caption">
            {displayFullDate}
          </Typography>
          <Typography color={'text.secondary'} variant="caption">
            {`#${ordinalNumber}`}
          </Typography>
        </Box>
        <Typography variant="body2" m={2}>
          {content}
        </Typography>
        <EmojisLine CommentId={commentId} UserId={User.id} />
      </TableCell>
      <TableCell width={'10%'} style={{ verticalAlign: 'top' }}>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteComment}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default Comment
