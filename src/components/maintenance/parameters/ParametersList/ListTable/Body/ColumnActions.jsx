import { FaFolderOpen, FaRegEdit } from "react-icons/fa";
import { ColumnLink } from "src/components/shared/columns";

export function ColumnActions({ keyRow }) {
  return (
    <>
      <ColumnLink
        href={`/maintenance/parameters/details/${keyRow}`}
        codenamePermission="see_single_parameter"
        className="mx-1"
      >
        <FaFolderOpen />
      </ColumnLink>
      <ColumnLink
        href={`/maintenance/parameters/edit/${keyRow}`}
        codenamePermission="alter_parameter"
        className="mx-1"
      >
        <FaRegEdit />
      </ColumnLink>
    </>
  );
}
