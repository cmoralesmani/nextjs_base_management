import api from "./api";

export const fetchWrapper = {
  get,
  post,
  put,
};

function get(url, config) {
  return api.get(url, config);
}

function post(url, body) {
  return api.post(url, body);
}

function put(url, body) {
  return api.put(url, body);
}
