import { Spinner } from 'src/components/spinner'
import { useProfiles } from 'src/hooks/profile'
import { SelectField } from 'src/components/shared/fields'

export function ProfilesField ({
  id,
  label = 'Perfiles',
  text,
  controllerRequestAPI
}) {
  const { profiles, isLoading } = useProfiles({ controllerRequestAPI })

  const optionsSource = profiles?.map((profile) => ({
    id: profile.id_profile,
    description: profile.de_profile
  }))
  return isLoading
    ? (
    <Spinner />
      )
    : (
    <SelectField
      id={id}
      label={label}
      text={text}
      optionsSource={optionsSource}
    />
      )
}
