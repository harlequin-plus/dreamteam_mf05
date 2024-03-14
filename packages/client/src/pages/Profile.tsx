import { Box, Divider, Stack } from '@mui/material'
import ChangeAvatar from '../components/ChangeAvatar'
import BasicModal, { DataBasicModalForm } from '../components/BasicModal'
import ProfileField from '../components/ProfileField'
import { useEffect, useState } from 'react'
import { ChangePass, User } from '../api/type'
import { getUser } from '../services/apiService'
import { changeAvatar, changePassword } from '../services/user'

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
    getUser()
      .then(res => {
        setUserInfo(res)
        console.log(res)
      })
      .catch(error => console.log(error)) //TODO перенаправление на страницу авторизации
  }, [])

  const handleChangePassword = async (data: DataBasicModalForm) => {
    changePassword(data as ChangePass).catch(error => console.log(error))
  }

  const handleChangeAvatar = (data: File) => {
    changeAvatar(data)
      .then(() => {
        getUser().then(res => {
          setUserInfo(res)
          console.log(res)
        })
      })
      .catch(error => console.log(error))
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={13}>
      <ChangeAvatar
        handleChangeAvatar={handleChangeAvatar}
        avatar={`https://ya-praktikum.tech/api/v2/resources${userInfo.avatar}`}
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
