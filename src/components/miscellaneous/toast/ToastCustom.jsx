// src/components/miscellaneous/toast/ToastCustom.jsx

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FaComments } from "react-icons/fa";

import { toastService, ToastType } from "src/services";

export { ToastCustom };

ToastCustom.propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

ToastCustom.defaultProps = {
  id: "default-toast",
  fade: true,
};

function ToastCustom({ id, fade }) {
  const router = useRouter();
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Subscripcion al nuevo notificador de toast
    const subscription = toastService.onToast(id).subscribe((toast) => {
      // Limpia los toast cuando se recibe un toast vacio
      if (!toast.message) {
        setToasts((toasts) => {
          // filtra los toasts sin etiqueta 'keepAfterRouteChange'
          const filteredToasts = toasts.filter((x) => x.keepAfterRouteChange);

          // establece etiqueta 'keepAfterRouteChange' a false en el resto
          filteredToasts.forEach((x) => delete x.keepAfterRouteChange);
          return filteredToasts;
        });
      } else {
        // add toast to array
        setToasts((toasts) => [...toasts, toast]);

        // auto close toast if required
        if (toast.autoClose) {
          setTimeout(() => removeToast(toast), 8000);
        }
      }
    });

    // clear toasts on location change
    const clearToasts = () => {
      setTimeout(() => toastService.clear(id));
    };
    router.events.on("routeChangeStart", clearToasts);

    // clean up function that runs when the component unmounts
    return () => {
      // unsubscribe to avoid memory leaks
      subscription.unsubscribe();
      router.events.off("routeChangeStart", clearToasts);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function removeToast(toast) {
    if (fade) {
      // fade out toast
      const toastWithFade = { ...toast, fade: true };
      setToasts((toasts) =>
        toasts.map((x) => (x === toast ? toastWithFade : x))
      );

      // remove toast after faded out
      setTimeout(() => {
        setToasts((toasts) => toasts.filter((x) => x !== toastWithFade));
      }, 250);
    } else {
      // remove toast
      setToasts((toasts) => toasts.filter((x) => x !== toast));
    }
  }

  function bgClass(toast) {
    if (!toast) return;

    const toastTypeClass = {
      [ToastType.Success]: "success",
      [ToastType.Error]: "danger",
      [ToastType.Info]: "info",
      [ToastType.Warning]: "warning",
    };

    return toastTypeClass[toast.type];
  }

  if (!toasts.length) return null;

  return (
    <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          className="d-inline-block m-1"
          bg={bgClass(toast)}
          onClose={() => removeToast(toast)}
        >
          <Toast.Header>
            <FaComments />
            <strong className="me-auto">Sitio con NextJS</strong>
          </Toast.Header>
          <Toast.Body>
            <span dangerouslySetInnerHTML={{ __html: toast.message }}></span>
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
