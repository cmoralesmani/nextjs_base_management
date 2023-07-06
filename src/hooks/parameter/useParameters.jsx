import { useDataList } from 'src/hooks/resources'
import { parametersService } from 'src/services'

export function useParameters ({
  loadInitialData = true,
  controllerRequestAPI
}) {
  const {
    data: parameters,
    isLoading,
    error,
    loadDataCallback: loadParametersCallback
  } = useDataList({
    loadInitialData,
    sourceDataCallback: parametersService.getParameters,
    controllerRequestAPI
  })

  return {
    parameters,
    isLoading,
    error,
    loadParametersCallback
  }
}
