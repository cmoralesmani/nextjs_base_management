import api from './api'

export const fetchWrapper = {
  get,
  post,
  delete: _delete,
  put
}

function get (url, options = {}) {
  console.info('GET', url, options)
  return api.get(url, options)
}

function post (url, body) {
  console.info('POST', url, body)
  return api.post(url, body)
}

function _delete (url, options) {
  console.info('DELETE', url, options)
  return api.delete(url, options)
}

function put (url, body) {
  console.info('PUT', url, body)
  return api.put(url, body)
}
