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
  parameters: PropTypes.array
}

function ListTable ({ parameters }) {
  const hasPermissionViewProfile = useHasPermissionStatus({
    codenamePermission: 'see_single_parameter'
  })
  const hasPermissionChangeProfile = useHasPermissionStatus({
    codenamePermission: 'alter_parameter'
  })

  const hasActionButtons =
    (hasPermissionViewProfile || hasPermissionChangeProfile) &&
    !!parameters &&
    !!parameters.length

  return (
    <>
      <div className={`${styles.tableFixedHead}`}>
        <Table bordered hover responsive size="sm">
          <Head hasActionButtons={!!hasActionButtons} />
          <Body parameters={parameters} hasActionButtons={!!hasActionButtons} />
        </Table>
      </div>
      {!parameters && <Spinner />}
      {parameters && !parameters.length && (
        <Alert variant="warning">
          <FaBan className="me-1" />
          No hay parametros para mostrar
        </Alert>
      )}
    </>
  )
}
