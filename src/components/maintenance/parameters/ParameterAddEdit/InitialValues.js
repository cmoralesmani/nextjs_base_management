const initialValues = (parameter) =>
  !!parameter
    ? { ...parameter }
    : {
        id_definicion_m: "",
        de_definicion_m: "",
        obj_definicion_d: [],
      };

export default initialValues;
