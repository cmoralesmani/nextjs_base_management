import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { ProfileAddEdit } from 'src/components/accessibility/profiles'
import { LottieLoading } from 'src/components/miscellaneous/lotties'
import { useProfile } from 'src/hooks/profile'
import { PageLayout } from 'src/layouts'

export default function EditProfilePage () {
  const controllerRequestAPI = new AbortController()
  useEffect(() => () => controllerRequestAPI.abort(), [])

  const router = useRouter()
  const { id } = router.query

  const { profile, isLoading } = useProfile({ id, controllerRequestAPI })

  return (
    <PageLayout codenamePermission="alter_profile">
      {isLoading
        ? (
        <LottieLoading />
          )
        : (
        <ProfileAddEdit
          profile={profile}
          controllerRequestAPI={controllerRequestAPI}
        />
          )}
    </PageLayout>
  )
}
