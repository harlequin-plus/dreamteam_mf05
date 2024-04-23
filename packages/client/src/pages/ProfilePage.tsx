import { Box, Divider, Stack } from '@mui/material'
import ChangeAvatar from '../components/ChangeAvatar'
import Modalform from '../components/ModalForm'
import ProfileField from '../components/ProfileField'
import { useCallback, useEffect } from 'react'
import { resourceURL } from '../constants'
import { DataModalForm } from '../types'
import { useAppDispatch, useAppSelector } from '../hooks/reduxTsHook'
import { setUserState } from '../store/userState'
import { TChangePasswordInput } from '../models/TChangePasswordInput'
import { changeAvatar, changePassword } from '../services/user'

const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userState.item)

  useEffect(() => {
    document.title = 'Мой профиль'
  }, [])

  const handleChangePassword = useCallback(async (data: DataModalForm) => {
    try {
      await changePassword(data as TChangePasswordInput)
      return true
    } catch (error) {
      console.warn(`change password error: ${error}`)
      return false
    }
  }, [])

  const handleChangeAvatar = useCallback(
    async (file: File) => {
      try {
        const userRes = await changeAvatar(file)
        dispatch(setUserState(userRes))
      } catch (error) {
        console.warn(`change avatar error: ${error}`)
      }
    },
    [dispatch]
  )

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={13}
      flex="1 1 auto">
      <ChangeAvatar
        handleChangeAvatar={handleChangeAvatar}
        avatar={`${resourceURL}${user.avatar}`}
      />
      <Stack
        my={6}
        gap={2}
        p={2}
        sx={{ width: '35rem' }}
        divider={<Divider flexItem />}>
        <ProfileField value={user.email} label="Почта" />
        <ProfileField value={user.login} label="Логин" />
        <ProfileField value={user.first_name} label="Имя" />
        <ProfileField value={user.second_name} label="Фамилия" />
        <ProfileField
          value={user.display_name ? user.display_name : ''}
          label="Отображаемое имя"
        />
        <ProfileField value={user.phone} label="Телефон" />
      </Stack>
      <Modalform
        successText="Пароль успешно изменен!"
        handleSubmitForm={handleChangePassword}
        modalTitle="Изменить пароль"
        inputs={[
          {
            name: 'oldPassword',
            label: 'Старый пароль',
            type: 'password',
            autoComlete: 'password',
          },
          {
            name: 'newPassword',
            label: 'Новый пароль',
            type: 'password',
            autoComlete: 'password',
          },
        ]}></Modalform>
    </Box>
  )
}

export default Profile
