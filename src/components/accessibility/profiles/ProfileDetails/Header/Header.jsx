import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'
import { FaIdCard, FaListAlt, FaRegEdit } from 'react-icons/fa'

import { useHasPermissionStatus } from 'src/hooks/auth'

export function Header ({ profile }) {
  const hasPermissionChangeProfile = useHasPermissionStatus({
    codenamePermission: 'alter_profile'
  })
  const hasPermissionViewProfiles = useHasPermissionStatus({
    codenamePermission: 'see_profiles'
  })
  return (
    <Row>
      <Col className="text-center">
        {hasPermissionChangeProfile && (
          <Link
            href={`/accessibility/profiles/edit/${profile.id_profile}`}
            className="btn btn-link float-end"
            title="Editar perfil"
          >
            <FaRegEdit />
          </Link>
        )}
        {hasPermissionViewProfiles && (
          <Link
            href={'/accessibility/profiles/list'}
            className="btn btn-link float-end"
            title="Lista de perfiles"
          >
            <FaListAlt />
          </Link>
        )}
        <h3>
          <FaIdCard /> {profile.de_profile}
        </h3>
        <hr className="mb-3" />
      </Col>
    </Row>
  )
}
