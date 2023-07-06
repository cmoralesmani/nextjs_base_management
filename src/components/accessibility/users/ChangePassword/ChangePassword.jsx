import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaLock } from 'react-icons/fa'

import { Button } from 'src/components/miscellaneous'
import { ChangePasswordModal } from './ChangePasswordModal'

export { ChangePassword }

function ChangePassword ({ user }) {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(true)
  }

  if (!user) return null

  return (
    <>
      <Container className="text-end g-0">
        <Row>
          <Col>
            <Button
              variant="secondary"
              onClick={handleShow}
              size="sm"
              icon={<FaLock className="me-1" />}
            >
              Cambiar contraseña
            </Button>
          </Col>
        </Row>
      </Container>

      <ChangePasswordModal show={show} setShow={setShow} user={user} />
    </>
  )
}
