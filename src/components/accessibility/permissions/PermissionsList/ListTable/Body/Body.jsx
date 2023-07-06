import { ColumnData, ColumnLink } from 'src/components/shared/columns'

import { ColumnActions } from './ColumnActions'

export function Body ({ permissions, hasActionButtons }) {
  return (
    <tbody>
      {permissions &&
        permissions?.map((permission) => {
          const dataRow = { ...permission, id: permission.id_permission }
          return (
            <tr key={dataRow.id}>
              <td>
                <ColumnData dataRow={dataRow} columnName="de_permission">
                  {({ value }) => {
                    return (
                      <ColumnLink
                        href={`/accessibility/permissions/details/${dataRow.id}`}
                        codenamePermission="see_single_permission"
                      >
                        {value}
                      </ColumnLink>
                    )
                  }}
                </ColumnData>
              </td>
              {!!hasActionButtons && (
                <td className="text-center text-nowrap">
                  <ColumnActions keyRow={dataRow.id} />
                </td>
              )}
            </tr>
          )
        })}
    </tbody>
  )
}
