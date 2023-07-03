import { EditArrayField } from "src/components/shared/fields";

export function OptionsField({ id, label = "Opciones", text }) {
  return (
    <EditArrayField
      id={id}
      columnNameId="id_definicion_d"
      columnNameLabel="comentario_definicion_d"
      columnNameInput="descripcion_definicion_d"
      label={label}
      text={text}
    />
  );
}
