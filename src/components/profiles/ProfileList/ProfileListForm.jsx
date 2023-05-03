// src/components/profiles/ProfileList/ProfileListForm.jsx

import PropTypes from "prop-types";

import { SearchPanelForm } from "src/components/forms";

export { ProfileListForm };

ProfileListForm.propTypes = {
  updateProfilesCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function ProfileListForm({ updateProfilesCallback, setUrlDownload }) {
  return (
    <SearchPanelForm
      loadDataCallback={updateProfilesCallback}
      urlBaseDownload={`/profiles/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
