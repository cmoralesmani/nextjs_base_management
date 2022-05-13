// app/helpers/fetch-wrapper.js

import { userService } from "@app/services";

export const fetchWrapper = {
  get,
  getWithoutHandleResponse,
  post,
  put,
  delete: _delete,
  postAttachment,
};

function get(url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function getWithoutHandleResponse(url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postAttachment(url, body) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...authHeader(url),
    },
    credentials: "include",
    body: body,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user && user.token;
  // const isApiUrl = url.startsWith(apiUrl);
  // if (isLoggedIn && isApiUrl) {
  if (isLoggedIn) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    let data;
    try {
      data = text && JSON.parse(text);
    } catch {}

    if (!response.ok) {
      if ([401].includes(response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized (XXX)or 403 Forbidden response returned from api
        userService.logout();
      }

      let error;
      if (data) {
        error = data;
      } else {
        error = {
          message: response.statusText,
        };
      }
      return Promise.reject(error);
    }

    return data;
  });
}
