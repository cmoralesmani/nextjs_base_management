// src/components/parameters/ParametersList/ParametersListForm.jsx

import PropTypes from "prop-types";

import { SearchForm } from "src/components/elements";

export { ParametersListForm };

ParametersListForm.propTypes = {
  updateParametersCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function ParametersListForm({ updateParametersCallback, setUrlDownload }) {
  return (
    <SearchForm
      updateCallback={updateParametersCallback}
      urlBaseDownload={`/settings/parameters/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
