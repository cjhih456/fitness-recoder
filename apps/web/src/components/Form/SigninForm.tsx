import type { SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import EmailInput from './EmailInput';
import FileInput from './FileInput';
import GenderInput from './GenderInput';
import HobbyInput from './HobbyInput';
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
    mode: 'all',
    reValidateMode: 'onChange',
    shouldUseNativeValidation: false,
  })
  const { handleSubmit } = form;
  return <div>
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FileInput
          name="profile"
          title='Profile Image'
        />
        <div className="grid grid-cols-2">
          <NameInput name="firstName" title="First Name" required />
          <NameInput name="secondName" title="Second Name" required />
        </div>
        <NickNameInput name="nickName" title="Nick Name" required />
        <GenderInput name="gender" title="Gender" />
        <HobbyInput name="hobby" title="Hobby" />
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
        <FileInput
          name="kyc"
          title="KYC Images"
          max={3}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  </div>
}