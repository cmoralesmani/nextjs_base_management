import { SecretField } from 'src/components/shared/fields'

export function PasswordField ({
  id,
  label = 'Contraseña',
  placeholder = 'Contraseña',
  text
}) {
  return (
    <SecretField id={id} label={label} placeholder={placeholder} text={text} />
  )
}
