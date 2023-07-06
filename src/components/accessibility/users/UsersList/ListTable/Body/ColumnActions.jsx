import { FaFolderOpen, FaRegEdit } from 'react-icons/fa'
import { ColumnLink } from 'src/components/shared/columns'

export function ColumnActions ({ keyRow }) {
  return (
    <>
      <ColumnLink
        href={`/accessibility/users/details/${keyRow}`}
        codenamePermission="see_single_user"
        className="mx-1"
      >
        <FaFolderOpen />
      </ColumnLink>
      <ColumnLink
        href={`/accessibility/users/edit/${keyRow}`}
        codenamePermission="alter_user"
        className="mx-1"
      >
        <FaRegEdit />
      </ColumnLink>
    </>
  )
}
