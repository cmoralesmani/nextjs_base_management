import { TextField } from 'src/components/shared/fields'

export function LastNameField ({
  id,
  label = 'Apellidos',
  placeholder = 'Apellidos',
  text
}) {
  return (
    <TextField id={id} label={label} placeholder={placeholder} text={text} />
  )
}
