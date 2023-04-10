// src/services/user.service.js

import Router from "next/router";
import { BehaviorSubject } from "rxjs";

import { fetchWrapper } from "src/utilities";

const userSubject = new BehaviorSubject(
  process.browser &&
    (JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user")))
);

const baseUrl = `/api/accounts`;

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  getUserByUsername,
  getUserById,
  getUsers,
  register,
  update,
  delete: _delete,
  changePassword,
  hasPermissionsTo,
};

function login(username, password, sessionActive) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { username, password })
    .then((user) => {
      userSubject.next(user);
      if (sessionActive === "true") {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  if (localStorage.getItem("user")) localStorage.removeItem("user");
  else sessionStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/login");
}

function getUserByUsername(username) {
  return fetchWrapper.get(`${baseUrl}/details/by_username/${username}/`);
}

function getUserById(id_user) {
  return fetchWrapper.get(`${baseUrl}/details/by_id/${id_user}/`);
}

function getUsers(filters = {}) {
  return fetchWrapper.get(
    `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`
  );
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}/register`, user);
}

function update(id_user, params) {
  return fetchWrapper.put(`${baseUrl}/edit/${id_user}`, params).then((x) => {
    if (id_user === userSubject.value.id_user) {
      const user = { ...userSubject.value, ...params };
      const ls = localStorage.getItem("user");
      const ss = sessionStorage.getItem("user");
      if (ls) localStorage.setItem("user", JSON.stringify(user));
      else if (ss) sessionStorage.setItem("user", JSON.stringify(user));

      // Publicar usuario actualizado a los suscriptores
      userSubject.next(user);
    }
    return x;
  });
}

function _delete(id_user) {
  return fetchWrapper.delete(`${baseUrl}/delete/${id_user}`);
}

function changePassword(data) {
  return fetchWrapper.post(`${baseUrl}/change-password/${data.id_user}`, data);
}

function hasPermissionsTo(list_id_permission) {
  if (!userSubject.value) return false;

  return fetchWrapper.get(
    `${baseUrl}/has-permissions-to?list_id_permission=${encodeURIComponent(
      JSON.stringify(list_id_permission)
    )}`
  );
}
