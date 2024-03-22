import { Box, Divider, Stack } from '@mui/material'
import ChangeAvatar from '../components/ChangeAvatar'
import BasicModal from '../components/ModalForm'
import ProfileField from '../components/ProfileField'
import { useEffect } from 'react'
import { ChangePass, User } from '../api/type'
import { resourceURL } from '../constants'
import userApi from '../api/userApi'
import { DataModalForm } from '../types'
import { useAppDispatch, useAppSelector } from '../hook'
import { setUserState } from '../store/user'

const defaultUser: User = {
  id: 0,
  login: '',
  email: '',
  first_name: '',
  second_name: '',
  display_name: null,
  phone: '',
  avatar: null,
}

const Profile = () => {
  const dipatch = useAppDispatch()
  const userState = useAppSelector(state => state.userState)
  const user = userState.item ? userState.item : defaultUser
  console.log(user)
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
      <BasicModal
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
        ]}></BasicModal>
    </Box>
  )
}

export default Profile
