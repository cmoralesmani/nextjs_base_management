// pages/settings/parameters/edit/[id_parameter].jsx

import { useState } from "react";

import { SpinnerCustom } from "@app/components/elements";
import { SiteLayout } from "@app/components/layouts";
import { ParametersAddEdit } from "@app/components/templates";
import { parametersService } from "@app/services";

export default EditParameter;

function EditParameter({ id_parameter }) {
  const [parameter, setParameter] = useState(null);

  function handleLoadInit() {
    return parametersService.getById(id_parameter).then((x) => {
      setParameter(x);
    });
  }

  return (
    <SiteLayout
      titleSite="Edición de parametro"
      idPermission="PARAM-MODIF"
      handleLoadInit={handleLoadInit}
    >
      {parameter ? (
        <ParametersAddEdit parameter={parameter} />
      ) : (
        <SpinnerCustom />
      )}
    </SiteLayout>
  );
}

export async function getServerSideProps({ params }) {
  const { id_parameter } = params;
  if (!id_parameter) {
    return {
      notFound: true,
    };
  }

  return {
    props: { id_parameter },
  };
}
