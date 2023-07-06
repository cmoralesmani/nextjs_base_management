import PropTypes from 'prop-types'
import { Alert, Table } from 'react-bootstrap'
import { FaBan } from 'react-icons/fa'

import { Spinner } from 'src/components/spinner'
import { useHasPermissionStatus } from 'src/hooks/auth'

import { Head } from './Head'
import { Body } from './Body'

import styles from 'styles/TableFixedHeader.module.scss'

export { ListTable }

ListTable.propTypes = {
  profiles: PropTypes.array,
  deleteProfileCallback: PropTypes.func.isRequired
}

function ListTable ({ profiles, deleteProfileCallback }) {
  const hasPermissionViewProfile = useHasPermissionStatus({
    codenamePermission: 'see_single_profile'
  })
  const hasPermissionChangeProfile = useHasPermissionStatus({
    codenamePermission: 'alter_profile'
  })
  const hasPermissionDeleteProfile = useHasPermissionStatus({
    codenamePermission: 'delete_profile'
  })

  const hasActionButtons =
    (hasPermissionViewProfile ||
      hasPermissionChangeProfile ||
      hasPermissionDeleteProfile) &&
    profiles &&
    profiles.length

  return (
    <>
      <div className={`${styles.tableFixedHead}`}>
        <Table bordered hover responsive size="sm">
          <Head hasActionButtons={!!hasActionButtons} />
          <Body
            profiles={profiles}
            hasActionButtons={!!hasActionButtons}
            deleteProfileCallback={deleteProfileCallback}
          />
        </Table>
      </div>
      {!profiles && <Spinner />}
      {profiles && !profiles.length && (
        <Alert variant="warning">
          <FaBan className="me-1" />
          No hay perfiles para mostrar
        </Alert>
      )}
    </>
  )
}
