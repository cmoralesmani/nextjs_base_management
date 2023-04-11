// pages/settings/parameters/edit/[id_parameter].jsx

import { useState } from "react";

import { SpinnerCustom } from "src/components/elements";
import { PageLayout } from "src/layouts";
import { ParametersAddEdit } from "src/components/parameters";
import { useParameter } from "src/hooks/parameter/useParameter";

export default EditParameter;

function EditParameter({ id_parameter }) {
  const { parameter, isLoading } = useParameter({ id_parameter });

  return (
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
