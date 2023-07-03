import { TableHead } from "src/components/shared";

export function Head({ hasActionButtons }) {
  const labels = ["Nombre de usuario", "Nombre", "Apellido", "Estado"];
  return <TableHead labels={labels} hasActionButtons={hasActionButtons} />;
}
