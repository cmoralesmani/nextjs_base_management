import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { ParameterAddEdit } from 'src/components/maintenance/parameters'
import { LottieLoading } from 'src/components/miscellaneous/lotties'
import { useParameter } from 'src/hooks/parameter'
import { PageLayout } from 'src/layouts'

export default function EditParameterPage () {
  const controllerRequestAPI = new AbortController()
  useEffect(() => () => controllerRequestAPI.abort(), [])

  const router = useRouter()
  const { id } = router.query

  const { parameter: _parameter, isLoading } = useParameter({
    id,
    controllerRequestAPI
  })
  const parameter = _parameter?.parametro

  return (
    <PageLayout codenamePermission="alter_parameter">
      {isLoading
        ? (
        <LottieLoading />
          )
        : (
        <ParameterAddEdit parameter={parameter} />
          )}
    </PageLayout>
  )
}
