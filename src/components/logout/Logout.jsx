import { useLogout } from "src/hooks/auth";

export function Logout() {
  useLogout();
  return null;
}
