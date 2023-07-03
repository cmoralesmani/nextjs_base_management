import { memo } from "react";
import { Form } from "react-bootstrap";

import { useCheckboxContext } from "./GroupCheckFieldContext";

function GroupCheckFieldItem({ id, value, label, ...rest }) {
  const { field, helpers } = useCheckboxContext();
  const checked = Boolean(field.value && field.value.find((_) => _ === value));

  return (
    <Form.Group controlId={`${id}-${field.value}`}>
      <Form.Check className="form-check" type="checkbox">
        <Form.Check.Input
          type="checkbox"
          {...field}
          {...rest}
          checked={checked}
          onChange={() => {
            if (checked) {
              helpers.setValue(field.value.filter((_) => _ !== value));
            } else {
              helpers.setValue([...field.value, value]);
            }
          }}
        />
        <Form.Check.Label>{label}</Form.Check.Label>
      </Form.Check>
    </Form.Group>
  );
}

export default memo(GroupCheckFieldItem);
