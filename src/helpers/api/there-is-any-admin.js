// src/helpers/api/there-is-any-admin.js

const db = require("@db/models/index");

export { thereIsAnyAdmin };

async function thereIsAnyAdmin(transaction) {
  const count_admin = await db.bmauth_usuario_perfil.count({
    where: {
      ID_PERFIL: "SUADM",
    },
    transaction,
  });

  return count_admin > 0;
}
