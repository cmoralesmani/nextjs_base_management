import * as Yup from "yup";

const validationSchema = () =>
  Yup.object().shape({
    id_profile: Yup.string().required("El Id es requerido"),
    de_profile: Yup.string().required("El Nombre es requerido"),
    status_profile_id: Yup.string().required("El estado es requerido"),
    users_selected: Yup.array().of(Yup.string()),
    permissions_selected: Yup.array().of(Yup.string()),
  });

export default validationSchema;
