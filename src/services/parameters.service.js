// src/services/parameters.service.js

import { fetchWrapper } from "src/utilities";

const baseUrl = `/api/settings/parameters`;

export const parametersService = {
  getById,
  updateParameters,
  getParameters,
};

function getById(id_parameter) {
  return fetchWrapper
    .get(`${baseUrl}/details/${id_parameter}`)
    .then((response) => response.data);
}

function updateParameters(id_parameter, params) {
  return fetchWrapper
    .put(`${baseUrl}/edit/${id_parameter}`, params)
    .then((response) => response.data);
}

function getParameters(filters = {}) {
  return fetchWrapper
    .get(`${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`)
    .then((response) => response.data);
}
