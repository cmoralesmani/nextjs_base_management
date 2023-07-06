import { Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaUser, FaRegFileAlt, FaListAlt } from 'react-icons/fa'

import { Title } from 'src/components/miscellaneous'
import { useHasPermissionStatus } from 'src/hooks/auth'
import { FormAddEditLayout } from 'src/layouts'
import { userService, toastService } from 'src/services'
import { setErrorsReturnedByDjango } from 'src/utilities/forms'

import { AddEditForm } from './AddEditForm'
import initialValues from './InitialValues'
import validationSchema from './ValidationSchema'

export function UserAddEdit ({ user, controllerRequestAPI }) {
  const isAddMode = !user
  const router = useRouter()

  useEffect(
    () => () => {
      if (!isAddMode) {
        controllerRequestAPI.abort()
      }
    },
    []
  )

  /** * Permisos */
  const hasPermissionSeeUser = useHasPermissionStatus({
    codenamePermission: 'see_single_user'
  })
  const hasPermissionListUsers = useHasPermissionStatus({
    codenamePermission: 'see_users'
  })

  const itemsTopRightComponents = []
  if (hasPermissionListUsers) {
    itemsTopRightComponents.push(
      <Link
        key="listUser"
        href={'/accessibility/users/list'}
        className="btn btn-link"
        title="Lista de usuarios"
      >
        <FaListAlt />
      </Link>
    )
  }
  if (!isAddMode && hasPermissionSeeUser) {
    itemsTopRightComponents.push(
      <Link
        key="detailsUser"
        href={`/accessibility/users/details/${user?.id_user}`}
        className="btn btn-link"
        title="Detalle del usuario"
      >
        <FaRegFileAlt />
      </Link>
    )
  }

  function handleSubmitUser (values, formikHelpers) {
    return !isAddMode && !!user
      ? updateUser(user.id_user, values, formikHelpers)
      : createUser(values, formikHelpers)
  }

  function createUser (values, formikHelpers) {
    const { setFieldError } = formikHelpers
    return userService
      .create(values)
      .then((instance) => {
        toastService.success('Usuario creado correctamente', {
          keepAfterRouteChange: true
        })
        if (hasPermissionSeeUser && !!instance) {
          router.push({
            pathname: '/accessibility/users/details/[id]',
            query: { id: instance.id_user }
          })
        } else if (hasPermissionListUsers) { router.push('/accessibility/users/list') } else router.push('/')
      })
      .catch((errors) => {
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError)
      })
  }

  function updateUser (id, values, formikHelpers) {
    const { setFieldError } = formikHelpers

    return userService
      .update(id, values)
      .then(() => {
        toastService.success(
          `El usuario "${values.username}" ha sido actualizado`,
          { keepAfterRouteChange: true }
        )
        if (hasPermissionSeeUser) {
          router.push({
            pathname: '/accessibility/users/details/[id]',
            query: { id: user.id_user }
          })
        } else if (hasPermissionListUsers) { router.push('/accessibility/users/list') } else router.push('/')
      })
      .catch((errors) => {
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError)
      })
  }

  return (
    <>
      <Title text={isAddMode ? 'Agregar usuario' : 'Editar usuario'} />
      <FormAddEditLayout
        title="Datos del usuario"
        iconTitle={<FaUser />}
        itemsTopRightComponents={itemsTopRightComponents}
      >
        <Formik
          initialValues={initialValues(user)}
          validationSchema={validationSchema(isAddMode)}
          onSubmit={async (values, formikHelpers) => {
            await handleSubmitUser(values, formikHelpers)
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
