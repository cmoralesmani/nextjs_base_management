import * as Yup from "yup";

export const formSearchSchema = Yup.object().shape({
  search: Yup.string(),
});
