import PropTypes from 'prop-types'
import { Container, Col, Row } from 'react-bootstrap'
import { FaUndo, FaSave, FaTimesCircle } from 'react-icons/fa'

import { Button } from 'src/components/miscellaneous'

export { ResetCancelSave }

ResetCancelSave.propTypes = {
  handleReset: PropTypes.func,
  handleCancel: PropTypes.func,
  showButtonPrimary: PropTypes.bool,
  showButtonSecondary: PropTypes.bool,
  showButtonReset: PropTypes.bool,
  buttonPrimaryLabel: PropTypes.string,
  buttonSecondaryLabel: PropTypes.string
}

ResetCancelSave.defaultProps = {
  isSubmitting: false,
  buttonPrimaryLabel: 'Guardar',
  buttonSecondaryLabel: 'Cancelar',
  showButtonPrimary: true,
  showButtonSecondary: true,
  showButtonReset: true
}

function ResetCancelSave ({
  handleReset,
  handleCancel,
  isSubmitting,
  showButtonPrimary,
  showButtonSecondary,
  showButtonReset,
  buttonPrimaryLabel,
  buttonSecondaryLabel
}) {
  /* Botonera para disponer de (Restaurar, Guardar y Cancelar)
    En el caso del Restaurar y Cancela necesitan un manejador
    para saber que es lo que debe hacer indicado desde donde se
    este ocupando. Pero para Guardar no es necesario, solo que este
    componente este dentro de un Form, porque este es de tipo Submit.
     */
  return (
    <Container className="g-0">
      <Row className="justify-content-between">
        {showButtonReset && (
          <Col xs="auto">
            <Button
              className="me-1"
              variant="light"
              type="button"
              onClick={handleReset}
              isSubmitting={isSubmitting}
              size="sm"
              icon={<FaUndo className="me-1" />}
            />
          </Col>
        )}
        {(showButtonPrimary || showButtonSecondary) && (
          <Col>
            <Container className="g-0 mb-3">
              <Row className="row-cols-auto justify-content-end">
                <Col>
                  {showButtonPrimary && (
                    <Button
                      className="me-1"
                      variant="primary"
                      type="submit"
                      isSubmitting={isSubmitting}
                      size="sm"
                      icon={<FaSave className="me-1" />}
                    >
                      {buttonPrimaryLabel}
                    </Button>
                  )}
                </Col>
                <Col>
                  {showButtonSecondary && (
                    <Button
                      className="ms-1"
                      variant="secondary"
                      onClick={handleCancel}
                      size="sm"
                      icon={<FaTimesCircle className="me-1" />}
                    >
                      {buttonSecondaryLabel}
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
    </Container>
  )
}
