// src/components/templates/Profile/ProfileList/ProfileListTable.jsx

import Link from "next/link";
import PropTypes from "prop-types";
import { Alert, Badge, Col, Container, Row, Table } from "react-bootstrap";
import {
  FaBan,
  FaFileCsv,
  FaFolderOpen,
  FaPlus,
  FaRegEdit,
} from "react-icons/fa";

import {
  SpinnerCustom,
  ButtonDownload,
  ButtonDeleteConfirm,
} from "src/components/elements";
import { hasPermission } from "src/helpers/utils";
import { useHasPermissionStatus } from "src/hooks";

import styles from "styles/TableFixedHeader.module.scss";

export { ProfileListTable };

ProfileListTable.propTypes = {
  profiles: PropTypes.array,
  urlDownload: PropTypes.string,
  deleteProfileCallback: PropTypes.func.isRequired,
};

function ProfileListTable({ profiles, urlDownload, deleteProfileCallback }) {
  const permissions = useHasPermissionStatus([
    "see_single_profile",
    "create_profile",
    "alter_profile",
    "delete_profile",
  ]);
  const hasPermissionSeeProfile = hasPermission(
    permissions,
    "see_single_profile"
  );
  const hasPermissionCreateProfile = hasPermission(
    permissions,
    "create_profile"
  );
  const hasPermissionEditProfile = hasPermission(permissions, "alter_profile");
  const hasPermissionDeleteProfile = hasPermission(
    permissions,
    "delete_profile"
  );

  return (
    <Container className="g-0">
      <Row className="justify-content-center">
        <Col md={10}>
          <Container className="g-0 mb-3">
            <Row className="row-cols-auto justify-content-between">
              <Col className="text-center fs-5">
                <Badge bg="light" text="dark">
                  Total: {(profiles || []).length}
                </Badge>
              </Col>
              <Col>
                <Row className="row-cols-auto">
                  <Col>
                    {hasPermissionCreateProfile && (
                      <Link href="/profiles/create">
                        <a className="btn btn-primary btn-sm">
                          <FaPlus /> Nuevo
                        </a>
                      </Link>
                    )}
                  </Col>
                  {urlDownload && (
                    <ButtonDownload
                      buttonLabel="Exportar"
                      buttonIcon={<FaFileCsv />}
                      idPermission="export_profiles"
                      url={urlDownload}
                    />
                  )}
                </Row>
              </Col>
            </Row>
          </Container>
          <div className={`${styles.tableFixedHead}`}>
            <Table bordered hover responsive size="sm">
              <thead className="table-secondary">
                <tr>
                  <th>Perfil</th>
                  <th>Estado</th>
                  {(hasPermissionSeeProfile ||
                    hasPermissionEditProfile ||
                    hasPermissionDeleteProfile) &&
                    profiles &&
                    profiles.length > 0 && <th></th>}
                </tr>
              </thead>
              <tbody>
                {profiles &&
                  profiles?.map((profile) => (
                    <tr key={profile.id_perfil}>
                      <td>
                        {hasPermissionSeeProfile ? (
                          <Link href={`/profiles/details/${profile.id_perfil}`}>
                            <a>{profile.de_perfil}</a>
                          </Link>
                        ) : (
                          profile.de_perfil
                        )}
                      </td>
                      <td>
                        {profile.es_perfil == "ESPER-ACTIV" ? (
                          <Badge bg="success">{profile.de_es_perfil}</Badge>
                        ) : (
                          <Badge bg="danger">{profile.de_es_perfil}</Badge>
                        )}
                      </td>
                      {(hasPermissionSeeProfile ||
                        hasPermissionEditProfile ||
                        hasPermissionDeleteProfile) && (
                        <td className="text-center text-nowrap">
                          {hasPermissionSeeProfile && (
                            <Link
                              href={`/profiles/details/${profile.id_perfil}`}
                            >
                              <a className="mx-1">
                                <FaFolderOpen />
                              </a>
                            </Link>
                          )}
                          {hasPermissionEditProfile && (
                            <Link href={`/profiles/edit/${profile.id_perfil}`}>
                              <a className="mx-1">
                                <FaRegEdit />
                              </a>
                            </Link>
                          )}
                          {hasPermissionDeleteProfile && (
                            <ButtonDeleteConfirm
                              message={`Esta seguro que desea eliminar el perfil ${profile.de_perfil}?`}
                              callbackDelete={() => {
                                return deleteProfileCallback(profile.id_perfil);
                              }}
                            />
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {!profiles && <SpinnerCustom />}
          {profiles && !profiles.length && (
            <Alert variant="warning">
              <FaBan className="me-1" />
              No hay perfiles para mostrar
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
