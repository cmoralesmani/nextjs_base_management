import { useDataList } from 'src/hooks/resources'
import { userService, toastService } from 'src/services'

function useUsers ({ loadInitialData, controllerRequestAPI }) {
  const {
    data: users,
    setData: setUsers,
    isLoading,
    error,
    loadDataCallback: loadUsersCallback
  } = useDataList({
    loadInitialData,
    sourceDataCallback: userService.getUsers,
    controllerRequestAPI
  })

  function deleteUserCallback (id) {
    return userService.delete(id).then(() => {
      const timer = setTimeout(() => {
        setUsers((users) => users.filter((x) => x.id_user !== id))
      })
      toastService.success('Se eliminó correctamente el usuario')
      return () => {
        clearTimeout(timer)
      }
    })
  }

  return {
    users,
    isLoading,
    error,
    loadUsersCallback,
    deleteUserCallback
  }
}

export { useUsers }
