const initialValues = (profile) =>
  !!profile
    ? { ...profile }
    : {
        id_profile: "",
        de_profile: "",
        status_profile_id: "",
        users_selected: [],
        permissions_selected: [],
      };

export default initialValues;
