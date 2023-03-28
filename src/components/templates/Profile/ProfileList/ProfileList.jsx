// src/components/templates/Profile/ProfileList/ProfileList.jsx

import PropTypes from "prop-types";
import { useState } from "react";

import { ProfileListForm } from "./ProfileListForm";
import { ProfileListTable } from "./ProfileListTable";

export { ProfileList };

ProfileList.propTypes = {
  profiles: PropTypes.array,
  updateProfilesCallback: PropTypes.func.isRequired,
  deleteProfileCallback: PropTypes.func.isRequired,
};

function ProfileList({
  profiles,
  updateProfilesCallback,
  deleteProfileCallback,
}) {
  const [urlDownload, setUrlDownload] = useState();

  return (
    <>
      <ProfileListForm
        updateProfilesCallback={updateProfilesCallback}
        setUrlDownload={setUrlDownload}
      />
      <ProfileListTable
        profiles={profiles}
        urlDownload={urlDownload}
        deleteProfileCallback={deleteProfileCallback}
      />
    </>
  );
}
