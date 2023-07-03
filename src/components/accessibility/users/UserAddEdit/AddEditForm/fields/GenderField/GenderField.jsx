import { SelectSingleField } from "src/components/shared/fields";

export function GenderField({ id, label = "Sexo", text }) {
  const optionsSource = [
    {
      id: "SEX-M",
      description: "Masculino",
    },
    {
      id: "SEX-F",
      description: "Femenino",
    },
  ];
  return (
    <SelectSingleField
      id={id}
      label={label}
      text={text}
      optionsSource={optionsSource}
    />
  );
}
