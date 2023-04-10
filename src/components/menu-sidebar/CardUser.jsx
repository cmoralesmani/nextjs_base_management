// src/components/menu-sidebar/CardUser.jsx

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

import { selectUserState } from "src/redux/slices/user-slice";

import stylesButton from "styles/Button.module.scss";

export { CardUser };

function CardUser({ collapsed }) {
  const userState = useSelector(selectUserState);

  if (!userState) return null;

  return (
    <Link href={`/accessibility/accounts/details/${userState.id_user}`}>
      <a
        className={
          !!collapsed
            ? `${stylesButton.buttonLight} ${stylesButton.round}`
            : `${stylesButton.buttonLight} ${stylesButton.semiRound}`
        }
      >
        <FaUserCircle /> <span> {userState.username}</span>
      </a>
    </Link>
  );
}
