// pages/profiles/create/index.jsx

import React from "react";

import { SiteLayout } from "@app/components/layouts";
import { AddEditProfile } from "@app/components/templates";

export default CreateProfile;

function CreateProfile() {
  return (
    <SiteLayout
      titleSite="Nuevo perfil"
      idPermission="PERFI-CREAR"
      handleLoadInit={async () => {}}
    >
      <AddEditProfile />
    </SiteLayout>
  );
}
