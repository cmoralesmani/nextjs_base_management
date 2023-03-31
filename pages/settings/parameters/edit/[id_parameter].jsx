// pages/settings/parameters/edit/[id_parameter].jsx

import { useState } from "react";

import { SpinnerCustom } from "src/components/elements";
import { PageLayout } from "src/layouts";
import { ParametersAddEdit } from "src/components/templates";
import { parametersService } from "src/services";

export default EditParameter;

function EditParameter({ id_parameter }) {
  const [parameter, setParameter] = useState(null);

  function handleLoadInit() {
    return parametersService.getById(id_parameter).then((x) => {
      setParameter(x);
    });
  }

  return (
    // <PageLayout
    //   titleSite="Edición de parametro"
    //   idPermission="alter_parameter"
    //   handleLoadInit={handleLoadInit}
    // >
    <PageLayout
      titlePage="Edición de parametro"
      codenamePermission="alter_parameter"
    >
      {parameter ? (
        <ParametersAddEdit parameter={parameter} />
      ) : (
        <SpinnerCustom />
      )}
    </PageLayout>
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
