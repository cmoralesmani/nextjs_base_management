import { TextField } from "src/components/shared/fields";

export function IdField({
  id,
  label = "ID",
  placeholder = "ID",
  text,
  ...rest
}) {
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      text={text}
      {...rest}
    />
  );
}
