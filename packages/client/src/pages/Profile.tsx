import { Box, Divider, Stack } from '@mui/material'
import ChangeAvatar from '../components/ChangeAvatar/ChangeAvatar'
import BasicModal, {
  DataBasicModalForm,
} from '../components/BasicModal/BasicModal'
import ProfileField from '../components/ProfileField'
import { useEffect, useState } from 'react'
import authApi from '../api/auth'

const defaultUser = {
  login: '',
  email: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState(defaultUser)

  useEffect(() => {
    document.title = 'Мой профиль'
    authApi.me().then(res => setUserInfo(res))
  }, [])

  const handleChangePassword = async (data: DataBasicModalForm) => {
    const me = await authApi.me()
    console.log(userInfo)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={15}>
      <ChangeAvatar />
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
        <ProfileField value={userInfo.display_name} label="Отображаемое имя" />
        <ProfileField value={userInfo.phone} label="Телефон" />
      </Stack>
      <BasicModal
        handleSubmitForm={handleChangePassword}
        modalTitle="Изменить пароль"
        inputs={[
          {
            id: 'old_password',
            name: 'Старый пароль',
            type: 'password',
          },
          {
            id: 'new_password',
            name: 'Новый пароль',
            type: 'password',
          },
        ]}></BasicModal>
    </Box>
  )
}

export default Profile
