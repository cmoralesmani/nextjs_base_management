import { Badge } from 'react-bootstrap'

import { ButtonDeleteWithConfirm } from 'src/components/buttons'
import { ColumnData, ColumnLink } from 'src/components/shared/columns'
import { useHasPermissionStatus } from 'src/hooks/auth'

import { ColumnActions } from './ColumnActions'

export function Body ({ profiles, hasActionButtons, deleteProfileCallback }) {
  const hasPermissionDeleteProfile = useHasPermissionStatus({
    codenamePermission: 'delete_profile'
  })

  return (
    <tbody>
      {profiles &&
        profiles?.map((profile) => {
          const dataRow = { ...profile, id: profile.id_profile }
          return (
            <tr key={profile.id_profile}>
              <td>
                <ColumnData dataRow={dataRow} columnName="de_profile">
                  {({ value }) => {
                    return (
                      <ColumnLink
                        href={`/accessibility/profiles/details/${dataRow.id}`}
                        codenamePermission="see_single_profile"
                      >
                        {value}
                      </ColumnLink>
                    )
                  }}
                </ColumnData>
              </td>
              <td>
                <ColumnData dataRow={dataRow} columnName="de_status_profile">
                  {({ value }) => {
                    return (
                      <Badge
                        bg={
                          dataRow.status_profile_id === 'ESPER-ACTIV'
                            ? 'success'
                            : 'danger'
                        }
                      >
                        {value}
                      </Badge>
                    )
                  }}
                </ColumnData>
              </td>
              {!!hasActionButtons && (
                <td className="text-center text-nowrap">
                  <ColumnActions keyRow={dataRow.id} />
                  {hasPermissionDeleteProfile && (
                    <ButtonDeleteWithConfirm
                      message={`Esta seguro que desea eliminar el perfil ${dataRow.de_profile}?`}
                      callbackDelete={() => {
                        return deleteProfileCallback(dataRow.id)
                      }}
                    />
                  )}
                </td>
              )}
            </tr>
          )
        })}
    </tbody>
  )
}
