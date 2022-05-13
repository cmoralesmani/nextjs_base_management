// app/components/layouts/SiteLayout.jsx

import Error from "next/error";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { LottieLoading } from "@app/components/elements";
import { hasPermission } from "@app/helpers/utils";
import { titleService, userService } from "@app/services";

export { SiteLayout };

SiteLayout.propTypes = {
  titleSite: PropTypes.string,
  idPermission: PropTypes.string.isRequired,
  callbackHasPermission: PropTypes.func,
  handleLoadInit: PropTypes.func.isRequired,
};

SiteLayout.defaultProps = {
  titleSite: "",
};

function SiteLayout({ children, titleSite, idPermission, handleLoadInit }) {
  const [fetchStatus, setFetchStatus] = useState("waiting");

  useEffect(() => {
    let cancel = false;
    titleService.setTitle(titleSite);

    setFetchStatus("waiting");
    handleLoadInit()
      .then((callback) => {
        if (cancel) return;
        userService
          .hasPermissionsTo([idPermission])
          .then((permissionsResponse) => {
            if (cancel) return;
            if (callback) callback(permissionsResponse);
            setFetchStatus(
              hasPermission(permissionsResponse, idPermission)
                ? "ok"
                : "without_permission"
            );
          });
      })
      .catch(() => {
        if (cancel) return;
        setFetchStatus("not_found");
      });

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      {fetchStatus === "waiting" ? (
        <LottieLoading />
      ) : fetchStatus === "without_permission" ? (
        <Error statusCode={403} />
      ) : fetchStatus === "not_found" ? (
        <Error statusCode={404} />
      ) : (
        <>{children}</>
      )}
    </>
  );
}
