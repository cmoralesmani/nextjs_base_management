import { FaFolderOpen, FaRegEdit } from "react-icons/fa";
import { ColumnLink } from "src/components/shared/columns";

export function ColumnActions({ keyRow }) {
  return (
    <>
      <ColumnLink
        href={`/accessibility/profiles/details/${keyRow}`}
        codenamePermission="see_single_profile"
        className="mx-1"
      >
        <FaFolderOpen />
      </ColumnLink>
      <ColumnLink
        href={`/accessibility/profiles/edit/${keyRow}`}
        codenamePermission="alter_profile"
        className="mx-1"
      >
        <FaRegEdit />
      </ColumnLink>
    </>
  );
}
