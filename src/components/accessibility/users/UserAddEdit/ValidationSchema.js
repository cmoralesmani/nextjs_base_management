import * as Yup from 'yup'

const validationSchema = (isAddMode) =>
  Yup.object().shape({
    username: Yup.string().required('El usuario es requerido'),
    password: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .concat(
        isAddMode ? Yup.string().required('La contraseña es requerida') : null
      )
      .min(5, 'La contraseña debe ser mayor de 5 caracteres'),
    password2: Yup.string()
      .concat(
        isAddMode ? Yup.string().required('La contraseña es requerida') : null
      )
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
    name_user: Yup.string().required('El nombre es requerido'),
    lastname_user: Yup.string().required('El apellido es requerido'),
    gender_user_id: Yup.string()
      .oneOf(['SEX-M', 'SEX-F'], 'El sexo es requerido')
      .required('El sexo es requerido'),
    email: Yup.string()
      .email('El correo no es válido.')
      .required('El Correo electronico es requerido.'),
    phone_contact: Yup.string().required('El número telefónico es requerido.'),
    status_user_id: Yup.string()
      .oneOf(['ESCUS-ACTIV', 'ESCUS-INACT'], 'El estado es requerido')
      .required('El estado es requerido'),
    profiles_selected: Yup.array().of(Yup.string()),
    permissions_selected: Yup.array().of(Yup.string())
  })

export default validationSchema
