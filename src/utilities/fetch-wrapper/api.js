import axios from 'axios'

import {
  authService,
  toastService,
  processDataLogin,
  AUTH_API_URLS
} from 'src/services'
import { utilitiesBrowserStorage } from 'src/utilities'
import { BASE_URL } from 'src/utilities/types.d'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    const { authSubject } = authService
    const auth = authSubject.value
    const isLoggedIn = !!auth

    if (isLoggedIn) {
      config.headers.Authorization = `Bearer ${auth.access}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error)
    if (error.name !== 'CanceledError') {
      const originalConfig = error.config

      const response = error?.response

      if (response) {
        if (response.status === 401) {
          authService.logout()
        }

        if (originalConfig.url !== AUTH_API_URLS.CREATE_TOKEN) {
          // El Token de acceso ha expirado
          if (response.status === 403 && !originalConfig._retry) {
            originalConfig._retry = true

            try {
              const { authSubject } = authService
              const { refresh, username } = authSubject.value
              const rs = await instance.post(AUTH_API_URLS.REFRESH_TOKEN, {
                refresh
              })
              const storageToSave = utilitiesBrowserStorage.storageUsed
              const data = rs
              const newData = { ...data, username }
              processDataLogin({ data: newData, storageToSave })
              return instance(originalConfig)
            } catch (_error) {
              return Promise.reject(_error)
            }
          }
        }
        const _error = response.data || {
          detail: error.response.statusText
        }
        if (response.status === 422) {
          toastService.error('Hay problemas con algún campo del formulario', {
            keepAfterRouteChange: true
          })
        } else {
          toastService.error(_error.message, {
            keepAfterRouteChange: true
          })
        }
        return Promise.reject(_error)
      }
      const _error = {
        detail: error.message
      }
      toastService.error(_error.detail, {
        keepAfterRouteChange: true
      })
      return Promise.reject(_error)
    }
  }
)

export default instance
