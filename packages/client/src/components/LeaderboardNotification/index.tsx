import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import notification_icon from '../../assets/leaderboard_notification.png'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTsHook'
import {
  fillLeaderboardLite,
  getLeaderboardLite,
} from '../../services/leaderboard'
import { setLeaderboardState } from '../../store/leaderboardState'

export function LeaderboardNotification() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(state => state.userState.item)
  const allLeaders = useAppSelector(state => state.leaderboardState.items)

  useEffect(() => {
    if (!('Notification' in window) || !Notification) {
      return
    }

    const timerId = setInterval(function () {
      if (user.id !== -1 && Notification.permission === 'granted') {
        getLeaderboardLite({
          cursor: 0,
          limit: 30,
        })
          .then(list => {
            if (list.at(0)?.data.userId !== allLeaders?.at(0)?.data.userId) {
              fillLeaderboardLite(list)
                .then(list => {
                  dispatch(setLeaderboardState(list))
                })
                .catch(error => {
                  console.log('leaderboard error', error)
                })
              const notification = new Notification(
                'У нас новый лидер в игре!',
                {
                  body: 'Нажми сюда, чтобы перейти на страницу лидерборда!',
                  icon: notification_icon,
                }
              )

              notification.onclick = () => {
                navigate('/leaderboard')
              }
            }
          })
          .catch(error => {
            console.log('leaderboard error', error)
            clearTimeout(timerId)
          })
      }
    }, 10000)
    return () => {
      clearTimeout(timerId)
    }
  }, [allLeaders, dispatch, navigate, user.id])

  return <Fragment />
}

export default LeaderboardNotification
