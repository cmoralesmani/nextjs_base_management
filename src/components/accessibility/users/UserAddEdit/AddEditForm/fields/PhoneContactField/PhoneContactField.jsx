import { TextField } from 'src/components/shared/fields'

export function PhoneContactField ({
  id,
  label = 'Telefono',
  placeholder = 'Telefono',
  text
}) {
  return (
    <TextField id={id} label={label} placeholder={placeholder} text={text} />
  )
}
