import { useState } from 'react'
import { FormWrapper } from '../components/FormWrapper'
import { LoginForm } from '../components/LoginForm'
import { SignUpForm } from '../components/SignUpForm'

export default function LoginPage() {
  const [shown, setShown] = useState(true)
  const toggleShow = () => setShown(shown => !shown)
  return (
    <FormWrapper>
      {shown && <LoginForm toggleShow={toggleShow} />}
      {!shown && <SignUpForm toggleShow={toggleShow} />}
    </FormWrapper>
  )
}
