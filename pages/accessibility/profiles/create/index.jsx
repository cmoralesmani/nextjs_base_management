// pages/accessibility/profiles/create/index.jsx

import React from "react";

import { PageLayout } from "src/layouts";
import { AddEditProfile } from "src/components/profiles";

export default CreateProfile;

function CreateProfile() {
  return (
    <PageLayout titlePage="Nuevo perfil" codenamePermission="create_profile">
      <AddEditProfile />
    </PageLayout>
  );
}
