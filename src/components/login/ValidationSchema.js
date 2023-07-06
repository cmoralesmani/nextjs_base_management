import * as Yup from 'yup'

const validationSchema = () =>
  Yup.object().shape({
    username: Yup.string().required('Username es requerido'),
    password: Yup.string().required('Password es requerido'),
    keepSessionActive: Yup.bool()
  })

export default validationSchema
