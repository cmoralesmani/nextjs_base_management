const initialValues = (permission) =>
  permission
    ? { ...permission }
    : {
        id_permission: '',
        de_permission: '',
        users_selected: [],
        profiles_selected: []
      }

export default initialValues
