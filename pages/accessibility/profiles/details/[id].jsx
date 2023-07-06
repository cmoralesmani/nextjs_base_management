import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { ProfileDetails } from 'src/components/accessibility/profiles'
import { LottieLoading } from 'src/components/miscellaneous/lotties'
import { useProfile } from 'src/hooks/profile'
import { PageLayout } from 'src/layouts'

export default function DetailsProfilePage () {
  const controllerRequestAPI = new AbortController()
  useEffect(() => () => controllerRequestAPI.abort(), [])

  const router = useRouter()
  const { id } = router.query

  const { profile, isLoading } = useProfile({ id, controllerRequestAPI })

  return (
    <PageLayout codenamePermission="see_single_profile">
      {isLoading ? <LottieLoading /> : <ProfileDetails profile={profile} />}
    </PageLayout>
  )
}
