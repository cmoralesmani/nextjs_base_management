// src/components/templates/Parameters/ParametersList/ParametersList.jsx

import PropTypes from "prop-types";
import React, { useState } from "react";

import { ParametersListForm } from "./ParametersListForm";
import { ParametersListTable } from "./ParametersListTable";

export { ParametersList };

ParametersList.propTypes = {
  parameters: PropTypes.array,
  updateParametersCallback: PropTypes.func.isRequired,
};

function ParametersList({ parameters, updateParametersCallback }) {
  const [urlDownload, setUrlDownload] = useState();

  return (
    <>
      <ParametersListForm
        updateParametersCallback={updateParametersCallback}
        setUrlDownload={setUrlDownload}
      />
      <ParametersListTable parameters={parameters} urlDownload={urlDownload} />
    </>
  );
}
