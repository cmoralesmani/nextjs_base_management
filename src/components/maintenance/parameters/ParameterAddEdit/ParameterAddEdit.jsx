import { Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaRegFileAlt, FaListAlt } from 'react-icons/fa'

import { Title } from 'src/components/miscellaneous'
import { useHasPermissionStatus } from 'src/hooks/auth'
import { FormAddEditLayout } from 'src/layouts'
import { toastService, parametersService } from 'src/services'
import { setErrorsReturnedByDjango } from 'src/utilities/forms'

import { AddEditForm } from './AddEditForm'
import initialValues from './InitialValues'
import validationSchema from './ValidationSchema'

export function ParameterAddEdit (props) {
  const parameter = props?.parameter
  const isAddMode = !parameter
  const router = useRouter()

  const id = parameter ? parameter.id_definicion_m : undefined

  /** * Permisos */
  const hasPermissionViewParameter = useHasPermissionStatus({
    codenamePermission: 'see_single_parameter'
  })
  const hasPermissionViewParameters = useHasPermissionStatus({
    codenamePermission: 'see_parameters'
  })

  const itemsTopRightComponents = []
  if (hasPermissionViewParameters) {
    itemsTopRightComponents.push(
      <Link
        key="listParameters"
        href={'/maintenance/parameters/list'}
        className="btn btn-link"
        title="Lista de parametros"
      >
        <FaListAlt />
      </Link>
    )
  }
  if (!isAddMode && hasPermissionViewParameter) {
    itemsTopRightComponents.push(
      <Link
        key="detailsParameter"
        href={`/maintenance/parameters/details/${id}`}
        className="btn btn-link"
        title="Detalle del parametro"
      >
        <FaRegFileAlt />
      </Link>
    )
  }

  function handleSubmitParameter (values, formikHelpers) {
    return !isAddMode && !!parameter
      ? updateParameter(parameter.id_definicion_m, values, formikHelpers)
      : createParameter(values, formikHelpers)
  }

  function createParameter (values, formikHelpers) {
    router.push('/')
    return null
  }

  function updateParameter (id, values, formikHelpers) {
    const { setFieldError } = formikHelpers

    return parametersService
      .update(id, values)
      .then(() => {
        toastService.success(
          `El parametro "${values.de_definicion_m}" ha sido actualizado`,
          { keepAfterRouteChange: true }
        )
        if (hasPermissionViewParameter) {
          router.push({
            pathname: '/maintenance/parameters/details/[id_parameter]',
            query: { id_parameter: id }
          })
        } else if (hasPermissionViewParameters) { router.push('/maintenance/parameters/list') } else router.push('/')
      })
      .catch((errors) => {
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError)
      })
  }

  return (
    <>
      <Title text={isAddMode ? 'Agregar parametro' : 'Editar parametro'} />
      <FormAddEditLayout
        title="Datos del parametro"
        itemsTopRightComponents={itemsTopRightComponents}
      >
        <Formik
          initialValues={initialValues(parameter)}
          validationSchema={validationSchema()}
          onSubmit={async (values, formikHelpers) => {
            await handleSubmitParameter(values, formikHelpers)
          }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => {
            return <AddEditForm isAddMode={isAddMode} {...props} />
          }}
        </Formik>
      </FormAddEditLayout>
    </>
  )
}
