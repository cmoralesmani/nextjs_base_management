// src/components/templates/User/UserList/UserList.jsx

import PropTypes from "prop-types";
import { useState } from "react";

import { UserListForm } from "./UserListForm";
import { UserListTable } from "./UserListTable";

export { UserList };

UserList.propTypes = {
  users: PropTypes.array,
  updateUsersCallback: PropTypes.func.isRequired,
  deleteUserCallback: PropTypes.func.isRequired,
};

function UserList({ users, updateUsersCallback, deleteUserCallback }) {
  const [urlDownload, setUrlDownload] = useState();

  return (
    <>
      <UserListForm
        updateUsersCallback={updateUsersCallback}
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
