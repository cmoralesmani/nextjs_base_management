import api from "./api";

export const fetchWrapper = {
  get,
  post,
};

function get(url) {
  return api.get(url);
}

function post(url, body) {
  return api.post(url, body);
}
