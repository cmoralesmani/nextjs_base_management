import api from "./api";

export const fetchWrapper = {
  get,
  post,
  put,
};

function get(url) {
  return api.get(url);
}

function post(url, body) {
  return api.post(url, body);
}

function put(url, body) {
  return api.put(url, body);
}
