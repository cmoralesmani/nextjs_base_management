// pages/accessibility/accounts/create/index.jsx

import React from "react";

import { PageLayout } from "src/layouts";
import { UserAddEdit } from "src/components/accounts";

export default AccountsCreatePage;

function AccountsCreatePage() {
  return (
    <PageLayout codenamePermission={"create_user"} titlePage="Nuevo usuario">
      <UserAddEdit />
    </PageLayout>
  );
}
