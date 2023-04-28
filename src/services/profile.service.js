// src/services/profile.service.js

import { fetchWrapper } from "src/utilities";

const baseUrl = `/api/profiles`;

export const profileService = {
  getProfileById,
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};

function getProfileById(id_profile) {
  return fetchWrapper
    .get(`${baseUrl}/details/${id_profile}`)
    .then((response) => response.data);
}

function getProfiles(filters = {}) {
  return fetchWrapper
    .get(`${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`)
    .then((response) => response.data);
}

function createProfile(profile) {
  return fetchWrapper
    .post(`${baseUrl}/create`, profile)
    .then((response) => response.data);
}

function updateProfile(id_profile, params) {
  return fetchWrapper
    .put(`${baseUrl}/edit/${id_profile}`, params)
    .then((response) => response.data);
}

function deleteProfile(id_profile) {
  return fetchWrapper
    .delete(`${baseUrl}/delete/${id_profile}`)
    .then((response) => response.data);
}
