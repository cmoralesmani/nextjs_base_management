// src/components/accounts/UserList/UserListForm.jsx

import PropTypes from "prop-types";

import { SearchForm } from "src/components/elements";

export { UserListForm };

UserListForm.propTypes = {
  updateUsersCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function UserListForm({ updateUsersCallback, setUrlDownload }) {
  return (
    <SearchForm
      updateCallback={updateUsersCallback}
      urlBaseDownload={`/accounts/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
