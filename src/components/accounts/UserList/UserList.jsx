// src/components/accounts/UserList/UserList.jsx

import PropTypes from "prop-types";
import { useState } from "react";

import { UserListForm } from "./UserListForm";
import { UserListTable } from "./UserListTable";

export { UserList };

UserList.propTypes = {
  users: PropTypes.array,
  loadUsersCallback: PropTypes.func.isRequired,
  deleteUserCallback: PropTypes.func.isRequired,
};

function UserList({ users, loadUsersCallback, deleteUserCallback }) {
  const [urlDownload, setUrlDownload] = useState();

  return (
    <>
      <UserListForm
        loadUsersCallback={loadUsersCallback}
        setUrlDownload={setUrlDownload}
      />
      <UserListTable
        users={users}
        urlDownload={urlDownload}
        deleteUserCallback={deleteUserCallback}
      />
    </>
  );
}
