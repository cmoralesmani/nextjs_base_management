import PropTypes from "prop-types";

import { Search } from "src/components/search";

export { ListForm };

ListForm.propTypes = {
  updateParametersCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function ListForm({ updateParametersCallback, setUrlDownload }) {
  return (
    <Search
      loadDataCallback={updateParametersCallback}
      urlBaseDownload={`/maintenance/parameters/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
