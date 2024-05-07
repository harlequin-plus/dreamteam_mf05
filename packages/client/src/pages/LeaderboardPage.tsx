import { Leaderboard } from '../components/Leaderboard'
import { Button } from '@mui/material'
import axios from 'axios'

function LeaderboardPage() {
  const Test = async () => {
    const { data } = await axios.get('http://localhost:3001/topic', {
      withCredentials: true,
    })

    // console.log(data)
  }
  return (
    <>
      <Button onClick={Test}> Test</Button>
      <Leaderboard />
    </>
  )
}

export default LeaderboardPage
