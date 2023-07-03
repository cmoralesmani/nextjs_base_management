import PropTypes from "prop-types";

import { Search } from "src/components/search";

export { ListForm };

ListForm.propTypes = {
  updateProfilesCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function ListForm({ updateProfilesCallback, setUrlDownload }) {
  return (
    <Search
      loadDataCallback={updateProfilesCallback}
      urlBaseDownload={`/accessibility/profiles/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
