import { TextField } from 'src/components/shared/fields'

export function UsernameField ({
  id,
  label = 'Usuario',
  placeholder = 'Usuario',
  text
}) {
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      text={text}
      readOnly={true}
      plaintext={true}
    />
  )
}
