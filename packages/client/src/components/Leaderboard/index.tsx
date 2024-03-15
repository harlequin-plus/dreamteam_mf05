import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import {
  CardHeader,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import Box from '@mui/material/Box'
import { secondsToString } from '../../utils/convert'

type DataRow = {
  id: number
  place: number
  avatar: string
  name: string
  level: number
  score: number
  gameTimeSec: number
}

const rows: DataRow[] = [
  {
    id: 1,
    place: 1,
    avatar:
      'https://165dc6ae-1b27-4856-8ca7-b1edf208847c.selcdn.net/images/original/materials/sections/137153/137153.jpg?1704985745',
    name: 'Галина Совушкина',
    level: 12,
    score: 1234,
    gameTimeSec: 500,
  },
  {
    id: 2,
    place: 2,
    avatar:
      'https://i1.sndcdn.com/artworks-cX44g79njVzhFJPS-lLjMsw-t500x500.jpg',
    name: 'Наталья Морпеховна',
    level: 11,
    score: 900,
    gameTimeSec: 100,
  },
  {
    id: 3,
    place: 3,
    avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
    name: 'Дмитрий Самолетов',
    level: 8,
    score: 777,
    gameTimeSec: 245635673456745,
  },
  {
    id: 4,
    place: 4,
    avatar:
      'https://cdnn21.img.ria.ru/images/07e5/06/18/1738448523_0:54:864:540_1920x0_80_0_0_22bd72aa578b3fece6a89a620c95c4a1.jpg',
    name: 'Юрий Юг',
    level: 7,
    score: 654,
    gameTimeSec: 1,
  },
  {
    id: 5,
    place: 5,
    avatar:
      'https://avatars.dzeninfra.ru/get-zen-vh/6470655/2a00000185567553c0d55616cad65a5b472a/1080x1920',
    name: 'Евпатий Коловратий',
    level: 2,
    score: 121,
    gameTimeSec: 0,
  },
]

export function Leaderboard() {
  const [page, setPage] = React.useState(2)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
    //fetch data
  }

  return (
    <React.Fragment>
      <Box display={'flex'} alignItems="center" flexDirection="column">
        <Typography variant="h3" gutterBottom>
          Лучшие игроки
        </Typography>
        <Table style={{ maxWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Место</TableCell>
              <TableCell>Игрок</TableCell>
              <TableCell>Уровень</TableCell>
              <TableCell>Очки</TableCell>
              <TableCell align="right">Время в игре</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.place}</TableCell>
                <TableCell>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Remy Sharp"
                        src={row.avatar}
                        sx={{ width: 75, height: 75 }}
                      />
                    }
                    title={row.name}
                  />
                </TableCell>
                <TableCell>{row.level}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell align="right">
                  {secondsToString(row.gameTimeSec)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={30}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={5}
        />
      </Box>
    </React.Fragment>
  )
}
