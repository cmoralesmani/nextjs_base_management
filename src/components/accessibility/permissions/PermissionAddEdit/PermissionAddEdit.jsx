import { Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaRegFileAlt, FaListAlt } from 'react-icons/fa'

import { Title } from 'src/components/miscellaneous'
import { useHasPermissionStatus } from 'src/hooks/auth'
import { FormAddEditLayout } from 'src/layouts'
import { permissionService, profileService, toastService } from 'src/services'
import { setErrorsReturnedByDjango } from 'src/utilities/forms'

import { AddEditForm } from './AddEditForm'
import initialValues from './InitialValues'
import validationSchema from './ValidationSchema'
import { useEffect } from 'react'

export { PermissionAddEdit }

function PermissionAddEdit ({ permission, controllerRequestAPI }) {
  const isAddMode = !permission
  const router = useRouter()
  const id = permission ? permission.id_permission : undefined

  useEffect(
    () => () => {
      if (!isAddMode) {
        controllerRequestAPI.abort()
      }
    },
    []
  )

  const hasPermissionViewPermission = useHasPermissionStatus({
    codenamePermission: 'see_single_permission'
  })

  const hasPermissionViewPermissions = useHasPermissionStatus({
    codenamePermission: 'see_permissions'
  })

  const itemsTopRightComponents = []
  if (hasPermissionViewPermissions) {
    itemsTopRightComponents.push(
      <Link
        key="permissions_page"
        href={'/accessibility/permissions/list'}
        className="btn btn-link"
        title="Lista de permisos"
      >
        <FaListAlt />
      </Link>
    )
  }
  if (!isAddMode && hasPermissionViewPermission) {
    itemsTopRightComponents.push(
      <Link
        key="view_permission"
        href={`/accessibility/permissions/details/${id}`}
        className="btn btn-link"
        title="Detalle del permiso"
      >
        <FaRegFileAlt />
      </Link>
    )
  }

  const handleSubmitPermission = (values, formikHelpers) =>
    !isAddMode && !!permission // Se esta actualizando
      ? updatePermission(id, values, formikHelpers)
      : createPermission(values, formikHelpers)

  async function createPermission (values, formikHelpers) {
    const { setFieldError } = formikHelpers
    return profileService
      .create(values)
      .then((instance) => {
        toastService.success('Perfil creado correctamente', {
          keepAfterRouteChange: true
        })
        if (hasPermissionViewPermission) {
          router.push({
            pathname: '/accessibility/profiles/details/[id]',
            query: { id: instance.id_profile }
          })
        } else if (hasPermissionViewPermissions) { router.push('/accessibility/profiles/list') } else router.push('/')
      })
      .catch((errors) => {
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError)
      })
  }

  async function updatePermission (id, values, formikHelpers) {
    const { setFieldError } = formikHelpers
    return permissionService
      .update(id, values)
      .then(() => {
        toastService.success(
          `El permiso "${values.de_permission}" ha sido actualizado correctamente`,
          { keepAfterRouteChange: true }
        )
        if (hasPermissionViewPermission) {
          router.push({
            pathname: '/accessibility/permissions/details/[id]',
            query: { id }
          })
        } else if (hasPermissionViewPermissions) { router.push('/accessibility/permissions/list') } else router.push('/')
      })
      .catch((errors) => {
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError)
      })
  }

  return (
    <>
      <Title text={isAddMode ? 'Agregar permiso' : 'Editar permiso'} />
      <FormAddEditLayout
        title="Datos del permiso"
        itemsTopRightComponents={itemsTopRightComponents}
      >
        <Formik
          initialValues={initialValues(permission)}
          validationSchema={validationSchema()}
          onSubmit={async (values, formikHelpers) => {
            await handleSubmitPermission(values, formikHelpers)
          }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => {
            return (
              <AddEditForm
                isAddMode={isAddMode}
                controllerRequestAPI={controllerRequestAPI}
                {...props}
              />
            )
          }}
        </Formik>
      </FormAddEditLayout>
    </>
  )
}
