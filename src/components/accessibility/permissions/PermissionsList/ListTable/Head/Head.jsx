import { TableHead } from "src/components/shared";

export function Head({ hasActionButtons }) {
  const labels = ["Permiso"];
  return <TableHead labels={labels} hasActionButtons={hasActionButtons} />;
}
