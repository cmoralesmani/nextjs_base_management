import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { Title } from 'src/components/miscellaneous'

import { ActionButtons } from './ActionButtons'
import { ListForm } from './ListForm'
import { ListTable } from './ListTable'

export function ParametersList ({ parameters, loadParametersCallback }) {
  const [urlDownload, setUrlDownload] = useState()

  return (
    <>
      <Title text="Parametros" />
      <>
        <ListForm
          updateParametersCallback={loadParametersCallback}
          setUrlDownload={setUrlDownload}
        />
        <Container className="g-0">
          <Row className="justify-content-center">
            <Col md={10}>
              <ActionButtons
                lengthInfo={(parameters || []).length}
                urlDownload={urlDownload}
              />
              <ListTable parameters={parameters} />
            </Col>
          </Row>
        </Container>
      </>
    </>
  )
}
