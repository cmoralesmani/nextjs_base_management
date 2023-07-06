import { ButtonGroup, Container } from 'react-bootstrap'
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa'

import { Button } from 'src/components/miscellaneous'

export function GroupCheckFieldSelectAll ({ allOptions, setValue }) {
  const handleSelectAll = () => setValue(allOptions)
  const handleUnselectAll = () => setValue([])

  return (
    <Container className="g-0 mb-3 d-flex justify-content-end">
      <ButtonGroup size="sm">
        <Button
          variant="secondary"
          onClick={handleSelectAll}
          icon={<FaRegCheckSquare className="me-1" />}
        >
          Todos
        </Button>
        <Button
          variant="dark"
          onClick={handleUnselectAll}
          icon={<FaRegSquare className="me-1" />}
        >
          Ninguno
        </Button>
      </ButtonGroup>
    </Container>
  )
}
