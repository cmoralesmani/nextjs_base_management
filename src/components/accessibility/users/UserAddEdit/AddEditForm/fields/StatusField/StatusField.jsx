import { SelectSingleField } from 'src/components/shared/fields'

export function StatusField ({ id, label = 'Estado', text }) {
  const optionsSource = [
    {
      id: 'ESCUS-ACTIV',
      description: 'Activo'
    },
    {
      id: 'ESCUS-INACT',
      description: 'Inactivo'
    }
  ]
  return (
    <SelectSingleField
      id={id}
      label={label}
      text={text}
      optionsSource={optionsSource}
    />
  )
}
