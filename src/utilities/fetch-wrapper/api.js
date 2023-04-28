import axios from "axios";

import { authService, processDataLogin, AUTH_API_URLS } from "src/services";
import { utilitiesBrowserStorage } from "src/utilities";
import { BASE_URL } from "src/utilities/types.d";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const { authSubject } = authService;
    const auth = authSubject.value;
    const isLoggedIn = !!auth;

    if (isLoggedIn) {
      config.headers["Authorization"] = `Bearer ${auth.access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response.status === 401) {
      authService.logout();
    }

    if (originalConfig.url !== AUTH_API_URLS.CREATE_TOKEN && error.response) {
      // El Token de acceso ha expirado
      if (error.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const { authSubject } = authService;
          const { refresh, username } = authSubject.value;
          const rs = await instance.post(AUTH_API_URLS.REFRESH_TOKEN, {
            refresh,
          });
          const storageToSave = utilitiesBrowserStorage.storageUsed;
          const data = rs;
          const newData = { ...data, username };
          processDataLogin({ data: newData, storageToSave });
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    const _error = (error && error.response.data) || {
      detail: error.response.statusText,
    };
    return Promise.reject(_error);
  }
);

export default instance;
