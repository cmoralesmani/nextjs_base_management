import * as Yup from 'yup'

const validationSchema = (userToChange, userCurrentAuth) =>
  Yup.object().shape({
    oldPassword: Yup.string().concat(
      userToChange.id_user === userCurrentAuth?.id_user
        ? Yup.string().required('La contraseña anterior es requerida')
        : null
    ),
    newPassword: Yup.string()
      .required('La contraseña es requerida')
      .min(5, 'La contraseña debe ser mayor de 5 caracteres'),
    password2: Yup.string().oneOf(
      [Yup.ref('newPassword')],
      'Las contraseñas no coinciden'
    )
  })

export default validationSchema
