const initialValues = (user) =>
  !!user
    ? { ...user }
    : {
        username: "",
        password: "",
        password2: "",
        name_user: "",
        lastname_user: "",
        gender_user_id: "",
        email: "",
        phone_contact: "",
        profiles_selected: [],
        permissions_selected: [],
      };

export default initialValues;
