import { TextField } from 'src/components/shared/fields'

export function UsernameField ({
  id,
  label = 'Nombre de usuario',
  placeholder = 'Nombre de usuario',
  text
}) {
  return (
    <TextField id={id} label={label} placeholder={placeholder} text={text} />
  )
}
