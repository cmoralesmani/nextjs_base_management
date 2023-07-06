import { KEYS_TO_STORAGE } from 'src/utilities/browser-storage/types.d'
import { utilitiesBrowserStorage } from 'src/utilities/browser-storage'

export const storageService = {
  getElementsSavedInStorage,
  getStorageUsed,
  saveOnStorage,
  clearStorage
}

function saveOnStorage (data, storageToSave = sessionStorage) {
  // Los Keys en KEYS_TO_STORAGE deben venir el data devuelto por el API
  const elementsToSave = KEYS_TO_STORAGE.reduce(
    (acc, key) => {
      acc[key] = data[key]
      return acc
    },
    {}
  )

  /**
   * Almacenamiento de los token en localStorage o sessionStorage
   * dependiendo de si el usuario quiere mantener la sesion activa o no.
   * Guardando en el localStorage se puede permanecer conectado entra
   * actualizaciones de la página.
   */

  Object.keys(elementsToSave).forEach((key) => {
    storageToSave.setItem(key, elementsToSave[key])
  })

  return elementsToSave
}

function clearStorage () {
  KEYS_TO_STORAGE.forEach((key) => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  })
}

function getElementsSavedInStorage () {
  return utilitiesBrowserStorage.elementsSavedInStorage
}

function getStorageUsed () {
  return utilitiesBrowserStorage.storageUsed
}
