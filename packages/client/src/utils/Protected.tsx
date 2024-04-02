import { useEffect } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxTsHook'
import { FormWrapper } from '../components/FormWrapper'
import { CircularProgress } from '@mui/material'

type OwnProps = {
  redirect: string
}

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
    return <Outlet />
  } else {
    return (
      <FormWrapper>
        <CircularProgress color="secondary" />
      </FormWrapper>
    )
  }
}
