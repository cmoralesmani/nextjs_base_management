// src/components/accounts/UserList/UserListForm.jsx

import PropTypes from "prop-types";

import { Search } from "src/components/search";

export { UserListForm };

UserListForm.propTypes = {
  loadUsersCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function UserListForm({ loadUsersCallback, setUrlDownload }) {
  return (
    <Search
      loadDataCallback={loadUsersCallback}
      urlBaseDownload={`/accounts/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
