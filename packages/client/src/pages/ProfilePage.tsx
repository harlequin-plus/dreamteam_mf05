import { Box, Divider, Stack } from '@mui/material'
import ChangeAvatar from '../components/ChangeAvatar'
import ModalForm from '../components/ModalForm'
import ProfileField from '../components/ProfileField'
import { useEffect, useState } from 'react'
import { ChangePass, User } from '../api/type'
import { resourceURL } from '../constants'
import userApi from '../api/userApi'
import { DataModalForm, TupleUseState } from '../types'
import { getUser } from '../services/apiService'

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

const ProfilePage = () => {
  const [userInfo, setUserInfo]: TupleUseState<User> = useState(defaultUser)

  useEffect(() => {
    document.title = 'Мой профиль'

    const setUserdata = async () => {
      try {
        const user = await getUser()
        if (user) setUserInfo(user)
      } catch (e) {
        console.log(e)
      }
    }

    setUserdata()
  }, [])

  const handleChangePassword = async (data: DataModalForm) => {
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
      <ModalForm
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
        ]}></ModalForm>
    </Box>
  )
}

export default ProfilePage
