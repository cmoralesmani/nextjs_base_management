const db = require("@db/models/index");

export { thereIsAnyAdmin };

async function thereIsAnyAdmin(transaction) {
  const count_admin = await db.bmauth_user_profiles.count({
    where: {
      PROFILE_ID: "SUADM",
    },
    transaction,
  });

  return count_admin > 0;
}
