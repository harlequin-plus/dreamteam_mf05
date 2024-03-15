import { Box, Button, Divider, Stack } from '@mui/material'
import ChangeAvatar from '../components/ChangeAvatar'
import BasicModal, { DataBasicModalForm } from '../components/BasicModal'
import ProfileField from '../components/ProfileField'
import { useEffect, useState } from 'react'
import { ChangePass, User } from '../api/type'
import { resourceURL } from '../constants'
import authApi from '../api/authApi'
import userApi from '../api/userApi'

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
  const [userInfo, setUserInfo]: [
    User,
    React.Dispatch<React.SetStateAction<User>>
  ] = useState(defaultUser)

  useEffect(() => {
    document.title = 'Мой профиль'

    const setUserdata = async () => {
      try {
        const user = await authApi.getUser()
        setUserInfo(user)
      } catch (e) {
        console.log(e)
      }
    }

    setUserdata()
  }, [])

  const handleChangePassword = async (data: DataBasicModalForm) => {
    await userApi.changePassword(data as ChangePass)
  }

  const handleChangeAvatar = async (file: File) => {
    try {
      const user = await userApi.changeAvatar(file)
      setUserInfo(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={13}>
      <ChangeAvatar
        handleChangeAvatar={handleChangeAvatar}
        avatar={`${resourceURL}${userInfo.avatar}`}
      />
      <Stack
        my={6}
        gap={2}
        p={2}
        sx={{ width: '35rem' }}
        divider={<Divider flexItem />}>
        <ProfileField value={userInfo.email} label="Почта" />
        <ProfileField value={userInfo.login} label="Логин" />
        <ProfileField value={userInfo.first_name} label="Имя" />
        <ProfileField value={userInfo.second_name} label="Фамилия" />
        <ProfileField
          value={userInfo.display_name ? userInfo.display_name : ''}
          label="Отображаемое имя"
        />
        <ProfileField value={userInfo.phone} label="Телефон" />
      </Stack>
      <BasicModal
        successText="Пароль успешно изменен!"
        handleSubmitForm={handleChangePassword}
        modalTitle="Изменить пароль"
        inputs={[
          {
            id: 'oldPassword',
            name: 'Старый пароль',
            type: 'password',
          },
          {
            id: 'newPassword',
            name: 'Новый пароль',
            type: 'password',
          },
        ]}></BasicModal>
    </Box>
  )
}

export default Profile
