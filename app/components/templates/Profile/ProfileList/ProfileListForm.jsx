// app/components/templates/Profile/ProfileList/ProfileListForm.jsx

import PropTypes from "prop-types";

import { SearchForm } from "@app/components/elements";

export { ProfileListForm };

ProfileListForm.propTypes = {
  updateProfilesCallback: PropTypes.func.isRequired,
  setUrlDownload: PropTypes.func.isRequired,
};

function ProfileListForm({ updateProfilesCallback, setUrlDownload }) {
  return (
    <SearchForm
      updateCallback={updateProfilesCallback}
      urlBaseDownload={`/profiles/export`}
      setUrlDownload={setUrlDownload}
    />
  );
}
