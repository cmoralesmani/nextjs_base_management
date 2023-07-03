export { hasPermission };

/**
 * @description - Función que verifica si un usuario tiene un permiso específico
 * @param {array} list_id_permission - Lista de objetos con los permisos a verificar
 * @param {string} id_permission - Id del permiso a verificar
 * @returns {boolean} - Devuelve un valor booleano indicando si el usuario tiene el permiso
 */
function hasPermission(list_permissions, id_permission) {
  const result = list_permissions
    ? list_permissions.find((x) => x.id_permission == id_permission)
        ?.has_permission ?? false
    : undefined;
  return result;
}
