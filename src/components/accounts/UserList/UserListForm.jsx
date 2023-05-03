// src/components/accounts/UserList/UserListForm.jsx

import PropTypes from "prop-types";

import { SearchPanelForm } from "src/components/forms";

export { UserListForm };

UserListForm.propTypes = {
  loadUsersCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function UserListForm({ loadUsersCallback, setUrlDownload }) {
  return (
    <SearchPanelForm
      loadDataCallback={loadUsersCallback}
      urlBaseDownload={`/accounts/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
