// app/helpers/api/util.js

export { isJsonString };

/**
 * Verifica si un string es un Json valido.
 * Devuelve una respuesta indicando si es un json o no, pero tambien el contenido del JSON.
 * Tener en cuenta que si la cadena no tiene algun contenido,
 * se considera que no es un json.
 *
 * @param {string} str Cadena de texto a evaluar
 * @returns {object} Retorna un objeto con la informacion del json
 * Ejemplo: {isJson: boolean, jsonValue: object}
 */
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return { isJson: false, jsonValue: null };
  }
  return { isJson: true, jsonValue: JSON.parse(str) };
}