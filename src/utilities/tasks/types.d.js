import {
  FaCheckCircle,
  FaCircleNotch,
  FaExclamationTriangle,
} from "react-icons/fa";

import styles from "styles/Icons.module.css";

export const STATES_TASK = {
  SUCCESS: {
    text: "Exitoso",
    icon: <FaCheckCircle />,
    backgroundColor: "var(--green)",
  },
  PROGRESS: {
    text: "En progreso",
    icon: <FaCircleNotch className={styles.iconRotary} />,
    backgroundColor: "var(--purple-100)",
  },
  FAILED: {
    text: "Error",
    icon: <FaExclamationTriangle />,
    backgroundColor: "var(--red)",
    color: "var(--white)",
  },
};
