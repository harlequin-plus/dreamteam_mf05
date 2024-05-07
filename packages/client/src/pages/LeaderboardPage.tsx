import { Leaderboard } from '../components/Leaderboard'
import { Button } from '@mui/material'
import axios from 'axios'

function LeaderboardPage() {
  const Test = async () => {
    const value = await fetch('http://localhost:3001/topic', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })

    console.log(value)
  }
  return (
    <>
      <Button onClick={Test}> Test</Button>
      <Leaderboard />
    </>
  )
}

export default LeaderboardPage
