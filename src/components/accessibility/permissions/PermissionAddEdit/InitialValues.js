const initialValues = (permission) =>
  !!permission
    ? { ...permission }
    : {
        id_permission: "",
        de_permission: "",
      };

export default initialValues;
