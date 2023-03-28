// src/components/elements/ButtonDownload.jsx

const { map } = require("lodash");
import PropTypes from "prop-types";
import { useState } from "react";
import { Button, ButtonGroup, Col, Dropdown } from "react-bootstrap";
import { FaFileDownload } from "react-icons/fa";

import { hasPermission } from "src/helpers/utils";
import { useHasPermissionStatus } from "src/hooks";
import { exportService, toastService } from "src/services";

export { ButtonDownload };

ButtonDownload.propTypes = {
  url: PropTypes.string.isRequired,
  idPermission: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonIcon: PropTypes.object,
  buttonVariant: PropTypes.string,
  isUrlExternal: PropTypes.bool,
  inCol: PropTypes.bool,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      idPermission: PropTypes.string,
      buttonLabel: PropTypes.string,
      buttonIcon: PropTypes.object,
      buttonVariant: PropTypes.string,
      isUrlExternal: PropTypes.bool,
      inCol: PropTypes.bool,
    })
  ),
};

ButtonDownload.defaultProps = {
  buttonLabel: "Descargar",
  buttonIcon: <FaFileDownload />,
  buttonVariant: "success",
  isUrlExternal: false,
  inCol: true,
  actions: [],
};

function ButtonDownload({
  url,
  idPermission,
  buttonLabel,
  buttonIcon,
  buttonVariant,
  isUrlExternal,
  inCol,
  actions,
}) {
  const buttons = map(actions, (action) => {
    return {
      url: action?.url,
      buttonLabel: action?.buttonLabel || "Descargar",
      buttonIcon: action?.buttonIcon || <FaFileDownload />,
      buttonVariant: action?.buttonVariant || "success",
      isUrlExternal: action?.isUrlExternal || false,
      inCol: action?.inCol || true,
    };
  });

  /**
   * La url que manden debe ser apartir de la seccion del api.
   * Seccion del api http://xxxxx/api
   * Tendrian que agregarme el slash (/) y la direccion de la ruta
   */
  const hasPermissionIt = idPermission
    ? hasPermission(useHasPermissionStatus([idPermission]), idPermission)
    : true;
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onClickButton(button) {
    setIsSubmitting(true);
    exportService
      .exportFile(
        button ? button.url : url,
        button ? button.isUrlExternal : isUrlExternal
      )
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        toastService.error("La descarga falló");
      });
  }

  function getButton() {
    return (
      <>
        <Dropdown as={ButtonGroup} size="sm">
          <Button
            variant={buttonVariant}
            onClick={() => {
              onClickButton();
            }}
            disabled={isSubmitting}
            size="sm"
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <>{buttonIcon}</>
            )}
            {buttonLabel && <span className="ms-1">{buttonLabel}</span>}
          </Button>

          {buttons.length > 0 && (
            <>
              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                {map(buttons, (button, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        onClickButton(button);
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <>{button.buttonIcon}</>
                      )}
                      {button?.buttonLabel && (
                        <span className="ms-1">{button?.buttonLabel}</span>
                      )}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      </>
    );
  }

  return (
    <>
      {hasPermissionIt && <>{inCol ? <Col>{getButton()}</Col> : getButton()}</>}
    </>
  );
}
