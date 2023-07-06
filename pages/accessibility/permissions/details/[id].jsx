import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PermissionDetails } from 'src/components/accessibility/permissions'
import { LottieLoading } from 'src/components/miscellaneous/lotties'
import { usePermission } from 'src/hooks/permission'
import { PageLayout } from 'src/layouts'

export default function DetailsProfilePage () {
  const controllerRequestAPI = new AbortController()
  useEffect(() => () => controllerRequestAPI.abort(), [])

  const router = useRouter()
  const { id } = router.query

  const { permission, isLoading } = usePermission({ id, controllerRequestAPI })

  return (
    <PageLayout codenamePermission="see_single_permission">
      {isLoading
        ? (
        <LottieLoading />
          )
        : (
        <PermissionDetails permission={permission} />
          )}
    </PageLayout>
  )
}
