export { hasPermission }

/**
 * @description - Función que verifica si un usuario tiene un permiso específico
 * @param {array} listPermissions - Lista de objetos con los permisos a verificar
 * @param {string} idPermission - Id del permiso a verificar
 * @returns {boolean} - Devuelve un valor booleano indicando si el usuario tiene el permiso
 */
function hasPermission (listPermissions, idPermission) {
  const result = listPermissions
    ? listPermissions.find((x) => x.id_permission === idPermission)
      ?.has_permission ?? false
    : undefined
  return result
}
