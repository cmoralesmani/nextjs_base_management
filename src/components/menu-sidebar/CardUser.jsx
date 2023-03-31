// src/components/templates/MenuSidebar/CardUser.jsx

import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import styles from "styles/MenuSidebar.module.scss";

export { CardUser };

function CardUser({ user }) {
  const router = useRouter();

  function handleClick(url) {
    router.push(url);
  }

  return (
    <>
      <Container fluid className="g-0">
        <Row>
          <Col className="text-center">
            <div className={`sidebar-btn-wrapper ${styles.wrapButton}`}>
              <a
                className={"sidebar-btn"}
                href="#"
                onClick={() => handleClick(`/accounts/details/${user.id_user}`)}
              >
                <FaUserCircle className={styles.fontProfile} />
                <span> {user.username}</span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
