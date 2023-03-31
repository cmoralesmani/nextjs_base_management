import * as Yup from "yup";

export const formLoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  keepSessionActive: Yup.bool(),
});
