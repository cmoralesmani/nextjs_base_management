import { TextField } from "src/components/shared/fields";

export function DescriptionField({
  id,
  label = "Descripción",
  placeholder = "Descripción",
  text,
}) {
  return (
    <TextField id={id} label={label} placeholder={placeholder} text={text} />
  );
}
