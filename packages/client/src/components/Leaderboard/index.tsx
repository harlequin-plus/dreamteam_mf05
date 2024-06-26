import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import {
  CardHeader,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import Box from '@mui/material/Box'
import { secondsToString } from '../../utils/convert'
import { getLeaderboard } from '../../services/leaderboard'
import { useCallback, useEffect, useMemo } from 'react'
import { resourceURL, scoreVariableName } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTsHook'
import { setLeaderboardState } from '../../store/leaderboardState'
import { FormWrapper } from '../FormWrapper'

const paginationSize = 5

export function Leaderboard() {
  const dispatch = useAppDispatch()
  const [page, setPage] = React.useState(0)

  const allLeaders = useAppSelector(state => state.leaderboardState.items)
  const displayedLeaders = useMemo(() => {
    return allLeaders?.slice(page * paginationSize, (page + 1) * paginationSize)
  }, [allLeaders, page])

  const handleChangePage = useCallback(
    async (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      setPage(newPage)
    },
    []
  )

  useEffect(() => {
    // It calls twice on mount in development mode, production behavior is unchanged.
    // https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode
    getLeaderboard({
      cursor: 0,
      limit: 30,
    })
      .then(list => {
        dispatch(setLeaderboardState(list))
      })
      .catch(error => {
        console.log('leaderboard error', error)
      })
  }, [dispatch])

  return (
    <FormWrapper>
      <Container maxWidth="lg" style={{ flex: '1 1 auto', color: '#973232' }}>
        <Box display={'flex'} alignItems="center" flexDirection="column">
          <Typography variant="h4" component="h1" m={5}>
            Лучшие игроки
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Место</TableCell>
                <TableCell>Игрок</TableCell>
                <TableCell>Очки</TableCell>
                <TableCell align="right">Время в лучшей игре</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedLeaders?.map((leader, index) => (
                <TableRow key={leader.data.userId}>
                  <TableCell>{paginationSize * page + index + 1}</TableCell>
                  <TableCell>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="Leader Avatar"
                          src={`${resourceURL}${leader.data.included?.user.avatar}`}
                          sx={{
                            width: 75,
                            height: 75,
                            backgroundColor: '#973232',
                          }}
                        />
                      }
                      title={`${leader.data.included?.user.first_name} ${leader.data.included?.user.second_name}`}
                    />
                  </TableCell>
                  <TableCell>{leader.data[scoreVariableName]}</TableCell>
                  <TableCell align="right">
                    {secondsToString(
                      leader.data.secondsInGame ? leader.data.secondsInGame : 0
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={allLeaders?.length ?? 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={Math.min(allLeaders?.length ?? 0, paginationSize)}
          />
        </Box>
      </Container>
    </FormWrapper>
  )
}
