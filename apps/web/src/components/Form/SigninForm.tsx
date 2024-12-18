import type { SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FilePreview from './FilePreview';
import RHFInput from './RHFInput';

interface SigninFormParams {
  // File input
  profile: File[]
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
  const { handleSubmit, control } = form;
  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFInput<SigninFormParams>

        defaultValue={[]}
        name="profile"
        type="file"
        accept='image/*'
        title='Profile Image'
        className="hidden"
        labelChildren={
          <div className='bg-purple-500 rounded-lg p-2'>
            Set Image
          </div>
        }
      >
        {(fileSrc, deleteAction) => {
          return <div className="flex flex-row gap-4 ">
            {(fileSrc || [])?.map(
              (src, idx) => <FilePreview
                key={`profile-${idx}`}
                src={src}
                idx={idx}
                name="profile"
                cancelImage={deleteAction}
              />
            )}
          </div>
        }}
      </RHFInput>
      <div className="grid grid-cols-2">
        <RHFInput<SigninFormParams>

          name="firstName"
          type="text"
          title="First Name"
          defaultValue={''}
          rules={{
            required: 'Insert Second Name'
          }}
        />
        <RHFInput<SigninFormParams>

          name="secondName"
          type="text"
          title="Second Name"
          defaultValue={''}
          rules={{
            required: 'Insert Second Name'
          }}
        />
      </div>
      <RHFInput<SigninFormParams>

        name="nickName"
        type="text"
        defaultValue={''}
        title="Nick Name"
        rules={{
          required: true
        }} />
      <RHFInput<SigninFormParams>

        name="phone"
        type="phone"
        title="Phone"
        defaultValue={''}
        rules={{
          required: 'Insert Phone number'
        }}
      />
      <RHFInput<SigninFormParams>

        name="email"
        type="email"
        title="Email"
        defaultValue={''}
        rules={{
          required: 'Insert Email Address'
        }}
      />
      <RHFInput<SigninFormParams>

        defaultValue={[]}
        name="kyc"
        type="file"
        accept='image/*'
        title="KYC Images"
        className="hidden"
        rules={{
          max: 3
        }}
        onSelectFile={(files) => {
          console.log(files)
        }}
        labelChildren={
          <div className='bg-purple-500 rounded-lg p-2'>
            Add Images
          </div>
        }
      >
        {(fileSrc, deleteAction) => {
          return <div className="flex flex-row gap-4 ">
            {(fileSrc || [])?.map(
              (src, idx) => <FilePreview
                key={`kyc$-${idx}`}
                src={src}
                idx={idx}
                name="kyc"
                cancelImage={deleteAction}
              />
            )}
          </div>
        }}
      </RHFInput>
      <button type="submit">
        Submit
      </button>
    </form>
  </div >
}