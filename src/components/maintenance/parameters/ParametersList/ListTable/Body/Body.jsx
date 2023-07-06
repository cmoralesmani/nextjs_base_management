import { ColumnData, ColumnLink } from 'src/components/shared/columns'

import { ColumnActions } from './ColumnActions'

export function Body ({ parameters, hasActionButtons }) {
  return (
    <tbody>
      {parameters &&
        parameters?.map((parameter) => {
          const dataRow = { ...parameter, id: parameter.id_definicion_m }
          return (
            <tr key={parameter.id_definicion_m}>
              <td>
                <ColumnData dataRow={dataRow} columnName="de_definicion_m">
                  {({ value }) => {
                    return (
                      <ColumnLink
                        href={`/maintenance/parameters/details/${dataRow.id}`}
                        codenamePermission="see_single_parameter"
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
