import api from "./api";

export const fetchWrapper = {
  get,
  post,
  delete: _delete,
  put,
};

function get(url, options = {}) {
  console.log("GET", url, options);
  return api.get(url, options);
}

function post(url, body) {
  console.log("POST", url, body);
  return api.post(url, body);
}

function _delete(url, options) {
  console.log("DELETE", url, options);
  return api.delete(url, options);
}

function put(url, body) {
  console.log("PUT", url, body);
  return api.put(url, body);
}
