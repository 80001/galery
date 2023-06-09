import * as yup from 'yup'

//const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
const passwordRules = /^(?=.*\d)(?=.*[a-z]).{2,}$/
export const signsSchema = yup.object().shape({
    email: yup.string().email('Please, enter a valid email').required('Required'),
    name: yup.string().min(2).required('Required'),
    password: yup.string().min(2).matches(passwordRules, { message: 'Please create a stronger password' }).required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match!').required('Required'),
})