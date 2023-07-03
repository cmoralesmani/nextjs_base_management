import * as Yup from "yup";

const validationSchema = () =>
  Yup.object().shape({
    id_definicion_m: Yup.string().required("El ID es requerido"),
    de_definicion_m: Yup.string().required("La descripción es requerida"),
    obj_definicion_d: Yup.array().of(
      Yup.object().shape({
        id_definicion_d: Yup.string().required(
          "El ID de la opcion es requerida"
        ),
        descripcion_definicion_d: Yup.string()
          .max(255, "La descripción de la opción es requerida")
          .required("La descripción de la opcion es requerida"),
      })
    ),
  });

export default validationSchema;
