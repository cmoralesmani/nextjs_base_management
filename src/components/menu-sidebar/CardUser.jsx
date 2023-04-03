// src/components/menu-sidebar/CardUser.jsx

import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

import { selectUserState } from "src/redux/slices/user-slice";

import stylesButton from "styles/Button.module.scss";

export { CardUser };

function CardUser() {
  const userState = useSelector(selectUserState);

  const router = useRouter();

  function handleClick(url) {
    router.push(url);
  }

  if (!userState) return null;

  return (
    <Container fluid className="g-0">
      <Row>
        <Col className="text-center">
          <div className={stylesButton.buttonCardUserWrapper}>
            <a
              href="#"
              onClick={() =>
                handleClick(`/accounts/details/${userState.id_user}`)
              }
            >
              <FaUserCircle />
              <span> {userState.username}</span>
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
