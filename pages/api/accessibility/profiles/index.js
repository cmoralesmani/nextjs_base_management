import listProfilesCore from "src/api/accessibility/profiles";
import { apiHandler } from "src/helpers/api";

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return get();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function get() {
    const dataProfilesCoreAsJSON = await listProfilesCore(req, res);
    const dataProfiles = dataProfilesCoreAsJSON.map((p) => ({
      id_profile: p.ID_PROFILE,
      de_profile: p.DE_PROFILE,
      status_profile_id: p.STATUS_PROFILE_ID,
      de_status_profile: p.BMAUTH_DEFINITION_DETAIL.DE_DEFINITION_DETAIL,
    }));

    return res.status(200).json(dataProfiles);
  }
}
