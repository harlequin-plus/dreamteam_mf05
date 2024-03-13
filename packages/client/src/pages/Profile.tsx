import { Box } from '@mui/material'
import ChangeAvatar from '../components/ChangeAvatar/ChangeAvatar'
import BasicModal, {
  DataBasicModalForm,
} from '../components/BasicModal/BasicModal'
import InputProfile from '../components/InputProfile/InputProfile'
import { useEffect } from 'react'

const Profile = () => {
  useEffect(() => {
    document.title = 'Мой профиль'
  }, [])
  const handleChangePassword = (data: DataBasicModalForm) => {
    console.log(data)
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ChangeAvatar />
      <Box
        component={'form'}
        my={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={2}>
        <InputProfile id="email" value="test@test.com" label="Почта" />
        <InputProfile id="login" value="Test" label="Логин" />
        <InputProfile id="first_name" value="Иван" label="Имя" />
        <InputProfile id="second_name" value="Сидоров" label="Фамилия" />
        <InputProfile
          id="display_name"
          value="Картман"
          label="Отображаемое имя"
        />
        <InputProfile id="phone" value="89876543120" label="Телефон" />
      </Box>
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
