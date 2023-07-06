import { FaFolderOpen, FaRegEdit } from 'react-icons/fa'
import { ColumnLink } from 'src/components/shared/columns'

export function ColumnActions ({ keyRow }) {
  return (
    <>
      <ColumnLink
        href={`/accessibility/permissions/details/${keyRow}`}
        codenamePermission="see_single_permission"
        className="mx-1"
      >
        <FaFolderOpen />
      </ColumnLink>
      <ColumnLink
        href={`/accessibility/permissions/edit/${keyRow}`}
        codenamePermission="alter_permission"
        className="mx-1"
      >
        <FaRegEdit />
      </ColumnLink>
    </>
  )
}
