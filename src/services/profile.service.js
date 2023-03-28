// src/services/profile.service.js

import { fetchWrapper } from "src/helpers";

const baseUrl = `/api/profiles`;

export const profileService = {
  getProfileById,
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};

function getProfileById(id_profile) {
  return fetchWrapper.get(`${baseUrl}/details/${id_profile}`);
}

function getProfiles(filters = {}) {
  return fetchWrapper.get(
    `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`
  );
}

function createProfile(profile) {
  return fetchWrapper.post(`${baseUrl}/create`, profile);
}

function updateProfile(id_profile, params) {
  return fetchWrapper.put(`${baseUrl}/edit/${id_profile}`, params);
}

function deleteProfile(id_profile) {
  return fetchWrapper.delete(`${baseUrl}/delete/${id_profile}`);
}
