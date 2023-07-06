import { useEffect } from 'react'

import { ProfilesList } from 'src/components/accessibility/profiles'
import { useProfiles } from 'src/hooks/profile'
import { PageLayout } from 'src/layouts'

export default function ListProfilesPage () {
  const controllerRequestAPI = new AbortController()
  useEffect(() => () => controllerRequestAPI.abort(), [])

  const { profiles, loadProfilesCallback, deleteProfileCallback } = useProfiles(
    {
      loadInitialData: false,
      controllerRequestAPI
    }
  )

  return (
    <PageLayout codenamePermission="see_profiles">
      <ProfilesList
        profiles={profiles}
        loadProfilesCallback={loadProfilesCallback}
        deleteProfileCallback={deleteProfileCallback}
      />
    </PageLayout>
  )
}
