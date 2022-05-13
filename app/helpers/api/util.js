// app/helpers/api/util.js

import { Parser } from "json2csv";

export { isJsonString, downloadResource, hasLetter, hasNumber };

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

const downloadResource = (
  res,
  fileName,
  fields,
  data,
  options = {
    delimiter: ";",
    quote: '"',
    contentType: "text/csv",
    header: true,
    withBOM: true,
  }
) => {
  const csv = getCsvFromJson(fields, data, options);
  res.setHeader("Content-Type", options.contentType);
  res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
  return res.send(csv);
};

const getCsvFromJson = (
  fields,
  data,
  options = {
    delimiter: ";",
    quote: '"',
    contentType: "text/csv",
    header: true,
    withBOM: true,
  }
) => {
  const json2csv = new Parser({
    fields,
    delimiter: options.delimiter,
    quote: options.quote,
    header: options.header,
    withBOM: options.withBOM,
  });
  const csv = json2csv.parse(data);
  return csv;
};

function hasNumber(texto) {
  var numeros = "0123456789";

  for (let i = 0; i < texto.length; i++) {
    if (numeros.indexOf(texto.charAt(i), 0) != -1) {
      return 1;
    }
  }
  return 0;
}

function hasLetter(texto) {
  var letras = "abcdefghyjklmnñopqrstuvwxyz";

  texto = texto.toLowerCase();
  for (let i = 0; i < texto.length; i++) {
    if (letras.indexOf(texto.charAt(i), 0) != -1) {
      return 1;
    }
  }
  return 0;
}
