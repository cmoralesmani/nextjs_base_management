// src/services/export.service.js

import { fetchWrapper } from "src/helpers";

const baseUrl = `/api`;

export const exportService = {
  exportFile,
};

function exportFile(url, isUrlExternal) {
  let urlDownload = url;
  if (!isUrlExternal) {
    urlDownload = `${baseUrl}${url}`;
  }

  return fetchWrapper.getWithoutHandleResponse(urlDownload).then((response) => {
    if (!response.ok) {
      throw new Error(response);
    }

    const contentDisposition = response.headers.get("content-disposition");
    // Extraccion de filename en el header de la respuesta
    // https://medium.com/@nerdyman/prompt-a-file-download-with-the-content-disposition-header-using-fetch-and-filesaver-8683faf565d0
    const fileName = contentDisposition
      ? contentDisposition
          .split(";")
          .find((n) => n.includes("filename="))
          .replace("filename=", "")
          .trim()
      : null;
    response.blob().then((blob) => {
      // https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
      const urlBlob =
        window.URL && window.URL.createObjectURL
          ? window.URL.createObjectURL(blob)
          : window.webkitURL.createObjectURL(blob);
      const aTag = document.createElement("a");
      aTag.href = urlBlob;
      if (fileName) aTag.download = fileName;

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
      aTag.click();
    });
  });
}
