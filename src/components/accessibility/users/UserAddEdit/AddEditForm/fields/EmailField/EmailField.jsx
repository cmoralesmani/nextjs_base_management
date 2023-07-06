import { EmailField as EmailCommonField } from 'src/components/shared/fields'

export function EmailField ({
  id,
  label = 'Correo electrónico',
  placeholder = 'correo@dominio.com',
  text
}) {
  return (
    <EmailCommonField
      id={id}
      label={label}
      placeholder={placeholder}
      text={text}
    />
  )
}
