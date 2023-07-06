import { useField } from 'formik'
import { Accordion, Col, Form } from 'react-bootstrap'

import { CheckboxProvider } from './GroupCheckFieldContext'
import GroupCheckFieldItem from './GroupCheckFieldItem'
import { GroupCheckFieldSelectAll } from './GroupCheckFieldSelectAll'

function GroupCheckField ({ name, label, text, allOptions, children }) {
  // https://codesandbox.io/s/formik-checkbox-group-40w0y?file=/src/CheckboxGroupItem.tsx
  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers

  return (
    <Col className="mb-3">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h4>{label}</h4>
          </Accordion.Header>
          <Accordion.Body>
            <GroupCheckFieldSelectAll
              allOptions={allOptions}
              setValue={setValue}
            />
            <CheckboxProvider value={{ field, helpers, meta }}>
              {children}
            </CheckboxProvider>
            <Form.Control.Feedback type="invalid">
              {meta.error && meta.touched && meta.error}
            </Form.Control.Feedback>
            {!!text && <Form.Text muted>{text}</Form.Text>}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  )
}

export default Object.assign(GroupCheckField, { Item: GroupCheckFieldItem })
