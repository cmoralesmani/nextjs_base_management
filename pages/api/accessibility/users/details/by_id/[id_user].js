import { apiHandler, hasPermissionsTo } from 'src/helpers/api'
import { hasPermission } from 'src/helpers/utils'

const db = require('@db/models/index')

export default apiHandler(handler)

function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return get()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function get () {
    const { id_user: idUser } = req.query

    if (!idUser) {
      throw new Error('No especificó el usuario que desea ver')
    }

    // Tiene permiso para ver el detalle de usuarios?
    // Si soy el que esta conectado puedo acceder
    if (idUser !== req.user.id_user) {
      const hasPermissionToSeeDetailUser = hasPermission(
        await hasPermissionsTo(req.user.username, ['see_single_user']),
        'see_single_user'
      )
      if (!hasPermissionToSeeDetailUser) {
        return res.status(403).json({
          message: 'No tiene permisos para ver el detalle del usuario'
        })
      }
    }

    // En caso de poseer el permiso retorna los datos del usuarios
    const user = await db.bmauth_user.findOne({
      where: { ID_USER: idUser },
      include: [
        {
          model: db.bmauth_definition_detail,
          required: true,
          as: 'DEF_STATUS_USER'
        },
        {
          model: db.bmauth_definition_detail,
          required: true,
          as: 'DEF_GENDER_USER'
        }
      ]
    })

    /* Verifica si existe el usuario */
    if (!user) {
      throw new Error('El usuario no existe')
    }

    // Obtencion perfiles del usuario consultado
    const profiles = await db.bmauth_profile.findAll({
      where: { STATUS_PROFILE_ID: 'ESPER-ACTIV' },
      include: [
        {
          model: db.bmauth_user_profiles,
          required: true,
          include: [
            {
              model: db.bmauth_user,
              required: true,
              where: { ID_USER: idUser }
            }
          ]
        }
      ]
    })

    const profilesOfUser = profiles.map((p) => ({
      id_profile: p.ID_PROFILE,
      de_profile: p.DE_PROFILE
    }))
    const profilesSelected = profilesOfUser.map((p) => p.id_profile)

    // Obtencion permisos del usuario consultado
    const permissions = await db.bmauth_permission.findAll({
      include: [
        {
          model: db.bmauth_user_permissions,
          required: true,
          include: [
            {
              model: db.bmauth_user,
              required: true,
              where: { ID_USER: idUser }
            }
          ]
        }
      ]
    })

    const permissionsOfUser = permissions.map((p) => ({
      id_permission: p.ID_PERMISSION,
      de_permission: p.DE_PERMISSION
    }))
    const permissionsSelected = permissionsOfUser.map((p) => p.id_permission)

    // Obtencion de permisos del usuario consultado
    const permissionsDB = await Promise.all([
      db.bmauth_permission.findAll({
        attributes: ['ID_PERMISSION', 'DE_PERMISSION'],
        include: [
          {
            model: db.bmauth_user_permissions,
            required: true,
            right: true,
            include: [
              {
                model: db.bmauth_user,
                required: true,
                where: { ID_USER: idUser }
              }
            ]
          }
        ]
      }),
      db.bmauth_permission.findAll({
        attributes: ['ID_PERMISSION', 'DE_PERMISSION'],
        include: [
          {
            model: db.bmauth_profile_permissions,
            required: true,
            right: true,
            include: [
              {
                model: db.bmauth_profile,
                required: true,
                include: [
                  {
                    model: db.bmauth_user_profiles,
                    required: true,
                    include: [
                      {
                        model: db.bmauth_user,
                        required: true,
                        where: { ID_USER: idUser }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      })
    ])
    const permissionsDBFlat = permissionsDB.flat()
    const permissionsJSON = JSON.parse(JSON.stringify(permissionsDBFlat))
    const permissionsAll = permissionsJSON.map((p) => ({
      codename: p.ID_PERMISSION,
      de_permission: p.DE_PERMISSION
    }))
    const permissionsUniqueOfUser = permissionsAll.filter((obj, index) => {
      return (
        index === permissionsAll.findIndex((o) => obj.codename === o.codename)
      )
    })

    // Obtencion de los datos del creador
    const userCreate = await db.bmauth_user.findOne({
      where: {
        USERNAME: user.CREATED_BY
      },
      attributes: ['NAME_USER', 'LASTNAME_USER', 'ID_USER']
    })

    return res.status(200).json({
      id_user: user.ID_USER,
      username: user.USERNAME,
      name_user: user.NAME_USER,
      lastname_user: user.LASTNAME_USER,
      email: user.EMAIL,
      phone_contact: user.PHONE_CONTACT,
      gender_user_id: user.GENDER_USER_ID,
      de_gender_user: user.DEF_GENDER_USER.DE_DEFINITION_DETAIL,
      created_at: user.CREATED_AT,
      status_user_id: user.STATUS_USER_ID,
      de_status_user: user.DEF_STATUS_USER.DE_DEFINITION_DETAIL,
      profiles: profilesOfUser,
      profiles_selected: profilesSelected,
      permissions: permissionsOfUser,
      permissions_selected: permissionsSelected,
      created_by: user.CREATED_BY,
      id_user_creacion: userCreate?.ID_USER,
      name_user_creacion: userCreate?.NAME_USER,
      lastname_user_creacion: userCreate?.LASTNAME_USER,
      user_permissions: permissionsUniqueOfUser
    })
  }
}
