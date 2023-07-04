import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegFileAlt, FaListAlt } from "react-icons/fa";

import { Title } from "src/components/miscellaneous";
import { useHasPermissionStatus } from "src/hooks/auth";
import { FormAddEditLayout } from "src/layouts";
import { profileService, toastService } from "src/services";
import { setErrorsReturnedByDjango } from "src/utilities/forms";

import { AddEditForm } from "./AddEditForm";
import initialValues from "./InitialValues";
import validationSchema from "./ValidationSchema";
import { useEffect } from "react";

export { ProfileAddEdit };

function ProfileAddEdit({ profile, controllerRequestAPI }) {
  const isAddMode = !profile;
  const router = useRouter();
  const id = !!profile ? profile.id_profile : undefined;

  useEffect(
    () => () => {
      if (!isAddMode) {
        controllerRequestAPI.abort();
      }
    },
    []
  );

  const hasPermissionViewProfile = useHasPermissionStatus({
    codenamePermission: "see_single_profile",
  });

  const hasPermissionViewProfiles = useHasPermissionStatus({
    codenamePermission: "see_profiles",
  });

  const itemsTopRightComponents = [];
  if (hasPermissionViewProfiles) {
    itemsTopRightComponents.push(
      <Link
        key="profiles_page"
        href={`/accessibility/profiles/list`}
        className="btn btn-link"
        title="Lista de perfiles"
      >
        <FaListAlt />
      </Link>
    );
  }
  if (!isAddMode && hasPermissionViewProfile) {
    itemsTopRightComponents.push(
      <Link
        key="view_profile"
        href={`/accessibility/profiles/details/${id}`}
        className="btn btn-link"
        title="Detalle del perfil"
      >
        <FaRegFileAlt />
      </Link>
    );
  }

  const handleSubmitProfile = (values, formikHelpers) =>
    !isAddMode && !!profile // Se esta actualizando
      ? updateProfile(id, values, formikHelpers)
      : createProfile(values, formikHelpers);

  function createProfile(values, formikHelpers) {
    const { setFieldError } = formikHelpers;
    return profileService
      .create(values)
      .then((instance) => {
        toastService.success(`Perfil creado correctamente`, {
          keepAfterRouteChange: true,
        });
        if (hasPermissionViewProfile)
          router.push({
            pathname: "/accessibility/profiles/details/[id]",
            query: { id: instance.id_profile },
          });
        else if (hasPermissionViewProfiles)
          router.push("/accessibility/profiles/list");
        else router.push("/");
      })
      .catch((errors) => {
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError);
      });
  }

  function updateProfile(id, values, formikHelpers) {
    const { setFieldError } = formikHelpers;
    return profileService
      .update(id, values)
      .then(() => {
        toastService.success(
          `El perfil "${values.de_profile}" ha sido actualizado correctamente`,
          { keepAfterRouteChange: true }
        );
        if (hasPermissionViewProfile)
          router.push({
            pathname: "/accessibility/profiles/details/[id]",
            query: { id },
          });
        else if (hasPermissionViewProfiles)
          router.push("/accessibility/profiles/list");
        else router.push("/");
      })
      .catch((errors) => {
        /* Se establecen los errores en los campos devueltos por el api. */
        setErrorsReturnedByDjango(errors.errors, setFieldError);
      });
  }

  return (
    <>
      <Title text={!!isAddMode ? "Agregar perfil" : "Editar perfil"} />
      <FormAddEditLayout
        title="Datos del perfil"
        itemsTopRightComponents={itemsTopRightComponents}
      >
        <Formik
          initialValues={initialValues(profile)}
          validationSchema={validationSchema()}
          onSubmit={async (values, formikHelpers) => {
            await handleSubmitProfile(values, formikHelpers);
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
            );
          }}
        </Formik>
      </FormAddEditLayout>
    </>
  );
}
