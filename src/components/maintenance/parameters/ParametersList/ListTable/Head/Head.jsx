import { TableHead } from 'src/components/shared'

export function Head ({ hasActionButtons }) {
  const labels = ['Parametro']
  return <TableHead labels={labels} hasActionButtons={hasActionButtons} />
}
