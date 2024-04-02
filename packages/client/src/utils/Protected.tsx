import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxTsHook'
import { FormWrapper } from '../components/FormWrapper'
import { CircularProgress } from '@mui/material'
// import { FC } from 'react'

type OwnProps = {
  redirect: string
  children: React.ReactNode
}
// type Props = FC<OwnProps>

export const Protected = (props: OwnProps) => {
  const selectLoadStatus = useAppSelector(state => state.userState.loadStatus)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (selectLoadStatus === 'failed') {
      navigate(props.redirect, { state: { back: location.pathname } })
    }
  }, [selectLoadStatus])

  if (selectLoadStatus === 'success') {
    return <>{props.children}</>
  } else {
    return (
      <FormWrapper>
        <CircularProgress color="secondary" />
      </FormWrapper>
    )
  }
}
