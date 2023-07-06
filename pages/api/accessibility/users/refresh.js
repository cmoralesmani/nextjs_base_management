import { tokenRefresh } from 'src/api/helpers/auth'
import { apiHandler } from 'src/helpers/api'

export default apiHandler(handler)

function handler (req, res) {
  switch (req.method) {
    case 'POST':
      return refreshToken()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function refreshToken () {
    try {
      const { refresh } = req.body

      const refresp = await tokenRefresh(refresh, res)

      req.log.info(`-refreshToken- Token Refrescado correctamente: ${refresp}`)

      return res.status(200).json(refresp)
    } catch (err) {
      req.log.error(`-refreshToken- Error: ${err}`)
      throw err
    }
  }
}
