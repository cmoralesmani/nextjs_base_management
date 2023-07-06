export function setErrorsReturnedByDjango (errors, setter) {
  errors?.forEach((e) => {
    setter(e?.param, e?.msg)
  })
}
