export function setErrorsReturnedByDjango(errors, setter) {
  errors?.map((e) => {
    setter(e?.param, e?.msg);
  });
}
