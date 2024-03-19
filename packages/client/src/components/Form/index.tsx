import { Box, Button } from '@mui/material'
import { FC, HTMLAttributes, SyntheticEvent, useRef } from 'react'
import {
  DataModalForm,
  InputAutocomlete,
  InputName,
  InputType,
} from '../../types'
import { ControlledInput } from '../ControlledInput'

export interface ModalInput {
  label: string
  name: InputName
  type?: InputType
  autoComlete: InputAutocomlete
}

type OwnProps = {
  inputs: ModalInput[]
  submitData: (data: DataModalForm) => Promise<true | undefined>
  onCancel: () => void
  submitButtonText?: string
  cancelButtonText?: string
} & HTMLAttributes<HTMLDivElement>

type InputRef = {
  getValue: () => string | false
  resetInput: () => void
}

type Props = FC<OwnProps>

const Form: Props = ({
  inputs,
  submitButtonText = 'Изменить',
  cancelButtonText = 'Отмена',
  submitData,
  onCancel,
}) => {
  const refs: Record<string, React.MutableRefObject<InputRef>> = {}
  inputs.map(input => {
    refs[input.name] = useRef() as React.MutableRefObject<InputRef>
  })

  const handleOnSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const data: DataModalForm = {}
    const validateArr = Object.entries(refs).map(([key, value]) => {
      const inputvalue = value.current.getValue()
      if (inputvalue) {
        data[key] = inputvalue
        return true
      }
      return inputvalue
    })
    const error = validateArr.includes(false)
    if (error) return

    const isSuccess = await submitData(data)
    if (isSuccess) {
      Object.values(refs).map(value => {
        value.current.resetInput()
      })
    }
  }

  return (
    <Box component={'form'} onSubmit={handleOnSubmit}>
      {inputs.map(input => {
        return (
          <ControlledInput
            ref={refs[input.name]}
            key={input.name}
            isPassword={input.type === 'password'}
            name={input.name}
            label={input.label}
            autoComplete={input.autoComlete}></ControlledInput>
        )
      })}
      <Button type="submit" variant="contained">
        {submitButtonText}
      </Button>
      <Button onClick={onCancel}>{cancelButtonText}</Button>
    </Box>
  )
}

export default Form
