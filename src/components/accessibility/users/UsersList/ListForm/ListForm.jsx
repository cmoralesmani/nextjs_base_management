import PropTypes from "prop-types";

import { Search } from "src/components/search";

export { ListForm };

ListForm.propTypes = {
  updateUsersCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function ListForm({ updateUsersCallback, setUrlDownload }) {
  return (
    <Search
      loadDataCallback={updateUsersCallback}
      urlBaseDownload={`/accessibility/users/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
