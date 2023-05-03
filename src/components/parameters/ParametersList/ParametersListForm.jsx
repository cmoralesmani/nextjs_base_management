// src/components/parameters/ParametersList/ParametersListForm.jsx

import PropTypes from "prop-types";

import { SearchPanelForm } from "src/components/forms";

export { ParametersListForm };

ParametersListForm.propTypes = {
  updateParametersCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function ParametersListForm({ updateParametersCallback, setUrlDownload }) {
  return (
    <SearchPanelForm
      loadDataCallback={updateParametersCallback}
      urlBaseDownload={`/maintenance/parameters/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
