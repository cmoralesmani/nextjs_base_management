// pages/accounts/register.jsx

import React from "react";

import { SiteLayout } from "@app/components/layouts";
import { UserAddEdit } from "@app/components/templates";

export default function Register() {
  return (
    <SiteLayout
      titleSite="Nuevo usuario"
      idPermission="CUEUS-CREAR"
      handleLoadInit={async () => {}}
    >
      <UserAddEdit />
    </SiteLayout>
  );
}
