import { AsYouType } from 'libphonenumber-js/mobile'

export default function useValidator() {
  return {
    phoneType: (v: string) => {
      const phoneTypeChecker = new AsYouType()
      phoneTypeChecker.reset()
      phoneTypeChecker.input(v)
      const number = phoneTypeChecker.getNumber()
      return number?.getType() && number?.isPossible() || 'Wrong Number Pattern'
    },
    emailTypeCheck: (v: string) => {
      return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(v)
        || 'Wrong Email Patterns'
    }
  }
}