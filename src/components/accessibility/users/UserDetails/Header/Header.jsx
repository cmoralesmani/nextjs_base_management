import Link from 'next/link'
import { Badge, Col, Row } from 'react-bootstrap'
import { FaUsers, FaListAlt, FaRegEdit } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { useHasPermissionStatus } from 'src/hooks/auth'
import { selectUserState } from 'src/redux/slices/user-slice'

export function Header ({ user }) {
  const userState = useSelector(selectUserState)

  const hasPermissionSeeUsers = useHasPermissionStatus({
    codenamePermission: 'see_single_user'
  })
  const hasPermissionAlterUser = useHasPermissionStatus({
    codenamePermission: 'alter_user'
  })

  return (
    <Row>
      <Col className="text-center">
        {hasPermissionAlterUser && (
          <Link
            href={`/accessibility/users/edit/${user.id_user}`}
            className="btn btn-link float-end"
            title="Editar usuario"
          >
            <FaRegEdit />
          </Link>
        )}
        {hasPermissionSeeUsers && (
          <Link
            href={'/accessibility/users/list'}
            className="btn btn-link float-end"
            title="Lista de usuarios"
          >
            <FaListAlt />
          </Link>
        )}
        <h3>
          <FaUsers /> {user.username}
          {user.id_user === userState.id_user && (
            <Badge className="ms-2" bg="info" size="lg">
              Mi usuario
            </Badge>
          )}
        </h3>
        <hr className="mb-3" />
      </Col>
    </Row>
  )
}
