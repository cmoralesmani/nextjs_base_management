import { Spinner } from "src/components/spinner";
import { GroupCheckField } from "src/components/shared/fields";
import { usePermissions } from "src/hooks/permission";

export function PermissionsField({
  id,
  label = "Permisos",
  text,
  controllerRequestAPI,
}) {
  const { permissions, isLoading } = usePermissions({ controllerRequestAPI });
  const idPermissions = (permissions || []).map(
    (permission) => permission.id_permission
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <GroupCheckField
      name={id}
      label={label}
      text={text}
      allOptions={idPermissions}
    >
      {!!permissions &&
        permissions.map((permission) => (
          <GroupCheckField.Item
            key={permission.id_permission}
            id={permission.id_permission}
            value={permission.id_permission}
            label={permission.de_permission}
          />
        ))}
    </GroupCheckField>
  );
}
