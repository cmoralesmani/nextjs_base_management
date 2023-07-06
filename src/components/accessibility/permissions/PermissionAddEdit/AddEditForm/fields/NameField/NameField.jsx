import { TextField } from 'src/components/shared/fields'

export function NameField ({
  id,
  label = 'Nombre',
  placeholder = 'Nombre',
  text
}) {
  return (
    <TextField id={id} label={label} placeholder={placeholder} text={text} />
  )
}
