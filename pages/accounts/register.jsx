// pages/accounts/register.jsx

import React from "react";

import { PageLayout } from "src/layouts";
import { UserAddEdit } from "src/components/accounts";

export default function Register() {
  return (
    // <PageLayout
    //   titleSite="Nuevo usuario"
    //   idPermission="create_user"
    //   handleLoadInit={async () => {}}
    // >
    <PageLayout codenamePermission={"see_users"} titlePage="Nuevo usuario">
      <UserAddEdit />
    </PageLayout>
    // </PageLayout>
  );
}
