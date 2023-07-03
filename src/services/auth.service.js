import Router from "next/router";

import { fetchWrapper } from "src/utilities";
import { storageService } from "src/services/storage.service";
import { BehaviorSubjectManager } from "src/utilities/subject-manager";

const { saveOnStorage, clearStorage, getElementsSavedInStorage } =
  storageService;

/**
 * Se iniciliza un Subject para que por medio de el observable
 * se den cuenta de la informacion de la autenticación.
 * Al iniciar se setea con los datos del storage del navegador.
 */
const authSubject = new BehaviorSubjectManager();
const elementsSavedInStorage = getElementsSavedInStorage();
authSubject.setValue(elementsSavedInStorage);

export const AUTH_API_URLS = {
  CREATE_TOKEN: `/api/accessibility/users/authenticate/`,
  REFRESH_TOKEN: `/api/accessibility/users/refresh/`,
};

export const authService = {
  authSubject,
  login,
  logout,
};

export function processDataLogin({ data, storageToSave }) {
  // La data debe contener todos los elementos que se esperan guardar en el storage
  const elementsSavedOnStorage = saveOnStorage(data, storageToSave);

  /**
   * Se guardan los datos de la autenticación en el subject
   */
  authSubject.setValue(elementsSavedOnStorage);
}

function login(username, password, keepSessionActive = false) {
  return fetchWrapper
    .post(AUTH_API_URLS.CREATE_TOKEN, { username, password })
    .then((response) => {
      const { data } = response;
      const storageToSave = keepSessionActive ? localStorage : sessionStorage;
      const newData = { ...data, username };
      processDataLogin({
        data: newData,
        storageToSave,
      });
      return newData;
    });
}

function logout() {
  // Eliminar los datos de autentiacion del storage,
  clearStorage();

  // Poner null al valor del authSubject
  authSubject.setValue(null);

  // Redirigir a la página de inicio de sesión
  Router.push("/login");
}
