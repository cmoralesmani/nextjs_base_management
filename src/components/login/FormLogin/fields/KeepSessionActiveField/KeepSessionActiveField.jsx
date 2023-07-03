import { BooleanField } from "src/components/shared/fields";

export function KeepSessionActiveField({
  id,
  label = "Mantener la sesión activada",
  text,
}) {
  return <BooleanField id={id} label={label} text={text} />;
}
