import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { UserDetails } from "src/components/accessibility/users";
import { LottieLoading } from "src/components/miscellaneous/lotties";
import { useUser } from "src/hooks/user";
import { PageLayout } from "src/layouts";
import { selectUserState } from "src/redux/slices/user-slice";

export default function DetailsUserPage() {
  const controllerRequestAPI = new AbortController();
  useEffect(() => () => controllerRequestAPI.abort(), []);

  const router = useRouter();
  const { id } = router.query;

  const { user, isLoading } = useUser({ id, controllerRequestAPI });
  const userState = useSelector(selectUserState);

  const allowSelfUser = useCallback(
    ({ hasPermission }) =>
      hasPermission ? hasPermission : userState?.id_user === id,
    [userState]
  );

  return (
    <PageLayout
      codenamePermission="see_single_user"
      callbackPosPermission={allowSelfUser}
    >
      {!!isLoading ? <LottieLoading /> : <UserDetails user={user} />}
    </PageLayout>
  );
}
