const db = require('@db/models/index')

export { thereIsAnyAdmin }

async function thereIsAnyAdmin (transaction) {
  const countAdmin = await db.bmauth_user_profiles.count({
    where: {
      PROFILE_ID: 'SUADM'
    },
    transaction
  })

  return countAdmin > 0
}
