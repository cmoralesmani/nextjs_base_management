import { KEYS_TO_STORAGE } from "./types.d";

// Determinar si se esta ejecutando en el cliente
// ya que se revisa que este creada una ventana, equivalente al navegador
const hasWindow = typeof window === "object";

// Se determina el Storage donde esta guardada los datos persistentes
const inLocalStorage = KEYS_TO_STORAGE.reduce((acc, key) => {
  const value = hasWindow && localStorage.getItem(key);
  return value ? acc + 1 : acc;
}, 0);

const inSessionStorage = KEYS_TO_STORAGE.reduce((acc, key) => {
  const value = hasWindow && sessionStorage.getItem(key);
  return value ? acc + 1 : acc;
}, 0);

// Determina cual storage se esta utilizando
// En base a los datos que han de estar guardados ahi segun las KEYS_TO_STORAGE
const storageUsed =
  KEYS_TO_STORAGE.length === inLocalStorage
    ? localStorage
    : KEYS_TO_STORAGE.length === inSessionStorage
    ? sessionStorage
    : undefined;

// Se utiliza el reduce de manera tal que la asignacion de la nueva key
// se evalua y se devuelve una sola fila asignable al acc.
// Esto hace que no tenga que copiarse el acc todo el tiempo y solo se asigne la
// nueva propiedad al objeto acc.
const elementsSavedInStorage = storageUsed && {
  ...KEYS_TO_STORAGE.reduce(
    (acc, key) => ((acc[key] = storageUsed[key]), acc),
    {}
  ),
};

export const utilitiesBrowserStorage = {
  elementsSavedInStorage,
  storageUsed,
};
