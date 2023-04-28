// src/services/export.service.js

import { fetchWrapper } from "src/utilities";

const baseUrl = `/api`;

export const exportService = {
  exportFile,
};

function exportFile(url, isUrlExternal) {
  let urlDownload = url;
  if (!isUrlExternal) {
    urlDownload = `${baseUrl}${url}`;
  }

  return fetchWrapper.get(urlDownload).then((response) => {
    const blob = new Blob([response.data], { type: "text/csv" });

    // const headerval = response.headers["content-disposition"];
    const contentDisposition = response.headers.get("content-disposition");
    const filename = contentDisposition
      ? contentDisposition
          .split(";")
          .find((n) => n.includes("filename="))
          .replace("filename=", "")
          .trim()
      : null;

    // Creando un objeto para descargar url
    // const url = window.URL.createObjectURL(blob);
    // https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
    const urlBlob =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);

    // Crear una etiqueta anchor(a) de HTML
    // const a = document.createElement("a");
    const aTag = document.createElement("a");

    // Pasando la url de descarga de blob
    aTag.setAttribute("href", urlBlob);

    // Configuración del atributo de la etiqueta anchor para descargar
    // y pasar el nombre del archivo de descarga
    if (filename) aTag.setAttribute("download", filename);

    /**
     * Safari cree que _blank anchor son ventanas emergentes.
     * Solo queremos establecer el destino _blank si el navegador
     * no admite el atributo de descarga HTML5.
     * Esto le permite descargar archivos en Safari de escritorio
     * si el bloqueo de ventanas emergentes está habilitado.
     */
    if (typeof aTag.download === "undefined") {
      aTag.target = "_blank";
    }

    // Realizar descarga con un clic
    aTag.click();
  });
}
