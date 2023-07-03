import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { ChangePassword } from "src/components/accessibility/users";
import { useHasPermissionStatus } from "src/hooks/auth";
import { selectUserState } from "src/redux/slices/user-slice";

export function ChangePasswordSection({ user }) {
  const userState = useSelector(selectUserState);
  const _hasPermissionChangePassword = useHasPermissionStatus({
    codenamePermission: "change_password",
  });
  const hasPermissionChangePassword =
    user.id_user == userState?.id_user ? true : _hasPermissionChangePassword;

  return (
    <>
      {hasPermissionChangePassword && (
        <Row>
          <Col className="mt-3">
            <ChangePassword user={user} />
          </Col>
        </Row>
      )}
    </>
  );
}
