// pages/profiles/create/index.jsx

import React from "react";

import { PageLayout } from "src/layouts";
import { AddEditProfile } from "src/components/templates";

export default CreateProfile;

function CreateProfile() {
  return (
    // <PageLayout
    //   titleSite="Nuevo perfil"
    //   idPermission="create_profile"
    //   handleLoadInit={async () => {}}
    // >
    <PageLayout titlePage="Nuevo perfil" codenamePermission="create_profile">
      <AddEditProfile />
    </PageLayout>
  );
}
