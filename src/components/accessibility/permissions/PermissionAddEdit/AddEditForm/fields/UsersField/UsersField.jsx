import { SelectField } from "src/components/shared/fields";

import { Spinner } from "src/components/spinner";
import { useUsers } from "src/hooks/user";

export function UsersField({
  id,
  label = "Usuarios",
  text,
  controllerRequestAPI,
}) {
  const { users, isLoading } = useUsers({ controllerRequestAPI });

  const optionsSource = users?.map((user) => ({
    id: user.id_user,
    description: `>> ${user.username} << ${user.name_user} ${user.lastname_user}`,
  }));
  return isLoading ? (
    <Spinner />
  ) : (
    <SelectField
      id={id}
      label={label}
      text={text}
      optionsSource={optionsSource}
    />
  );
}
