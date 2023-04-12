// pages/maintenance/parameters/details/[id_parameter].jsx

import { PageLayout } from "src/layouts";
import { ParametersDetails } from "src/components/parameters";
import { useParameter } from "src/hooks/parameter/useParameter";

export default DetailsParameter;

function DetailsParameter({ id_parameter }) {
  const { parameter, isLoading } = useParameter({ id_parameter });

  return (
    <PageLayout
      titlePage="Detalle de parametro"
      codenamePermission="see_single_parameter"
    >
      <ParametersDetails parameter={parameter} />
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
