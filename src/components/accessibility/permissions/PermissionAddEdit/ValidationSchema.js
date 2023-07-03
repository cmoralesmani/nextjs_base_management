import * as Yup from "yup";

const validationSchema = () =>
  Yup.object().shape({
    id_permission: Yup.string().required("El Id es requerido"),
    de_permission: Yup.string().required("El Nombre es requerido"),
  });

export default validationSchema;
