import { Form, InputGroup, FormControl } from "react-bootstrap";
import { FaTimes, FaSearch } from "react-icons/fa";

import { Button } from "src/components/miscellaneous";

export { SearchForm };

function SearchForm({
  handleSubmit,
  values,
  handleChange,
  handleBlur,
  errors,
  setFieldValue,
  isSubmitting,
  submitForm,
}) {
  function onClearSearch() {
    setFieldValue("search", "");
    setTimeout(submitForm, 1);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          type="text"
          name="search"
          placeholder="Buscar..."
          value={values.search}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!errors.search}
        />
        {!!values.search && (
          <Button
            variant="outline-secondary"
            onClick={onClearSearch}
            size="sm"
            icon={<FaTimes />}
          />
        )}
        <Button
          type="submit"
          isSubmitting={isSubmitting}
          size="sm"
          style={{ zIndex: 0 }}
          icon={<FaSearch />}
        />
      </InputGroup>
    </Form>
  );
}
