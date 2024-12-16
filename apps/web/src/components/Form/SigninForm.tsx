import type { SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import EmailInput from './EmailInput';
import NameInput from './NameInput';
import NickNameInput from './NickNameInput';
import PhoneInput from './PhoneInput';

interface SigninFormParams {
  // File input
  profile: File
  firstName: string
  secondName: string
  nickName: string
  hobby: string[]
  gender: string
  phone: string
  email: string
  kyc: File[]
  personalPolicy: boolean
  cachePolicy: boolean
}

export default function SigninForm() {
  const onSubmit = useCallback<SubmitHandler<SigninFormParams>>((data) => {
    console.log(data)
  }, [])
  const form = useForm<SigninFormParams>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const { handleSubmit } = form;
  return <div>
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2">
          <NameInput name="firstName" title="First Name" required />
          <NameInput name="secondName" title="Second Name" required />
        </div>
        <NickNameInput name="nickName" title="Nick Name" required />
        <PhoneInput
          name="phone"
          title="Phone"
          required="Insert Phone number"
        />
        <EmailInput
          name="email"
          title="Email"
          required="Insert Email Address"
        />

        <button type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  </div>
}