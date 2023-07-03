import { ListSection } from "src/components/shared/sections";
import { useHasPermissionStatus } from "src/hooks/auth";

export function ProfilesSection({ profiles }) {
  const hasPermissionViewProfile = useHasPermissionStatus({
    codenamePermission: "see_single_profile",
  });

  const items = (profiles || []).map((profile) => ({
    key: profile.id_profile,
    description: profile.de_profile,
    link: !!hasPermissionViewProfile
      ? { href: `/accessibility/profiles/details/${profile.id_profile}` }
      : undefined,
  }));

  return (
    <ListSection
      title="Perfiles"
      items={items}
      textEmpty="No tiene perfiles asignados"
    />
  );
}
