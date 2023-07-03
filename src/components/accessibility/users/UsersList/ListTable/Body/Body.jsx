import { Badge } from "react-bootstrap";

import { ButtonDeleteWithConfirm } from "src/components/buttons";
import { ColumnData, ColumnLink } from "src/components/shared/columns";
import { useHasPermissionStatus } from "src/hooks/auth";

import { ColumnActions } from "./ColumnActions";
import { useEffect } from "react";

export function Body({ users, hasActionButtons, deleteUserCallback }) {
  const hasPermissionDeleteUser = useHasPermissionStatus({
    codenamePermission: "delete_user",
  });

  return (
    <tbody>
      {users &&
        users.map((user) => {
          const dataRow = { ...user, id: user.id_user };
          return (
            <tr key={user.id_user}>
              <td>
                <ColumnData dataRow={dataRow} columnName="username">
                  {({ value }) => {
                    return (
                      <ColumnLink
                        href={`/accessibility/users/details/${dataRow.id}`}
                        codenamePermission="see_single_user"
                      >
                        {value}
                      </ColumnLink>
                    );
                  }}
                </ColumnData>
              </td>
              <td>
                <ColumnData dataRow={dataRow} columnName="name_user" />
              </td>
              <td>
                <ColumnData dataRow={dataRow} columnName="lastname_user" />
              </td>
              <td>
                <ColumnData dataRow={dataRow} columnName="de_status_user">
                  {({ value }) => {
                    return (
                      <Badge
                        bg={
                          dataRow.status_user_id == "ESCUS-ACTIV"
                            ? "success"
                            : "danger"
                        }
                      >
                        {value}
                      </Badge>
                    );
                  }}
                </ColumnData>
              </td>
              {!!hasActionButtons && (
                <td className="text-center text-nowrap">
                  <ColumnActions keyRow={dataRow.id} />
                  {hasPermissionDeleteUser && (
                    <ButtonDeleteWithConfirm
                      message={`Esta seguro que desea eliminar el usuario ${dataRow.username}?`}
                      callbackDelete={() => {
                        return deleteUserCallback(dataRow.id);
                      }}
                    />
                  )}
                </td>
              )}
            </tr>
          );
        })}
    </tbody>
  );
}
