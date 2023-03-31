import React from "react";

export const SidebarHeader = ({ children, ...rest }) => {
  return (
    <div {...rest}>
      <div style={{ display: "flex", alignItems: "center" }}>NextJS</div>
    </div>
  );
};
