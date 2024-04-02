import { Box, Divider, Stack } from '@mui/material'
import ChangeAvatar from '../components/ChangeAvatar'
import Modalform from '../components/ModalForm'
import ProfileField from '../components/ProfileField'
import { useEffect } from 'react'
import { ChangePass } from '../api/type'
import { resourceURL } from '../constants'
import userApi from '../api/userApi'
import { DataModalForm } from '../types'
import { useAppDispatch, useAppSelector } from '../hooks/reduxTsHook'
import { setUserState } from '../store/userState'

const Profile = () => {
  const dipatch = useAppDispatch()
  const user = useAppSelector(state => state.userState.item)

  useEffect(() => {
    document.title = 'Мой профиль'
  }, [])

  const handleChangePassword = async (data: DataModalForm) => {
    await userApi.changePassword(data as ChangePass)
  }

  const handleChangeAvatar = async (file: File) => {
    try {
      const userRes = await userApi.changeAvatar(file)
      dipatch(setUserState(userRes))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={13}>
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
