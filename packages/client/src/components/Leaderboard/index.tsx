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
import { mockPlayers } from '../../mocks/players.mock'

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
            {mockPlayers.map(player => (
              <TableRow key={player.id}>
                <TableCell>{player.place}</TableCell>
                <TableCell>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Remy Sharp"
                        src={player.avatar}
                        sx={{ width: 75, height: 75 }}
                      />
                    }
                    title={player.name}
                  />
                </TableCell>
                <TableCell>{player.level}</TableCell>
                <TableCell>{player.score}</TableCell>
                <TableCell align="right">
                  {secondsToString(player.gameTimeSec)}
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
