import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { Title } from 'src/components/miscellaneous'

import { ActionButtons } from './ActionButtons'
import { ListForm } from './ListForm'
import { ListTable } from './ListTable'

export function UsersList ({ users, loadUsersCallback, deleteUserCallback }) {
  const [urlDownload, setUrlDownload] = useState()

  return (
    <>
      <Title text="Cuentas de usuarios" />
      <>
        <ListForm
          updateUsersCallback={loadUsersCallback}
          setUrlDownload={setUrlDownload}
        />
        <Container className="g-0">
          <Row className="justify-content-center">
            <Col md={10}>
              <ActionButtons
                lengthInfo={(users || []).length}
                urlDownload={urlDownload}
              />
              <ListTable
                users={users}
                deleteUserCallback={deleteUserCallback}
              />
            </Col>
          </Row>
        </Container>
      </>
    </>
  )
}
