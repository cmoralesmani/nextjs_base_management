import React from "react";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "src/hooks/auth";

export const SidebarFooter = ({ children, collapsed, ...rest }) => {
  const { auth } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "20px",
      }}
    >
      {collapsed ? (
        <a href={"/"}>icon</a>
      ) : (
        <div {...rest}>
          <div fontWeight={600}>Pro Sidebar</div>
          <div>V</div>
          <div style={{ marginTop: "16px" }}>
            <a href={"/"}>
              <div variant="caption" color="#607489" fontWeight={600}>
                View code
              </div>
            </a>
            {!!auth && (
              <Link href="/logout">
                <a>
                  <FaSignOutAlt /> <span>Logout</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
