import { TableHead } from 'src/components/shared'

export function Head ({ hasActionButtons }) {
  const labels = ['Perfil', 'Estado']
  return <TableHead labels={labels} hasActionButtons={hasActionButtons} />
}
